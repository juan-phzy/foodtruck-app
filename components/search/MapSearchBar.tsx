// React & Hooks
import { useRef, useState, useEffect } from "react";

// React Native Components
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
} from "react-native";

// Theme, Sizing, & Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

// Types
import Mapbox from "@rnmapbox/maps";
import {
    Coordinates,
    GoogleAutocompleteResponse,
    ParsedSuggestion,
} from "@/types";

// Zustand State Management
import useUserLocationStore from "@/store/useUserLocationStore";

// Environment Variables
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY ?? "");
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

interface MapSearchBarProps {
    readonly handleSearch: ({ latitude, longitude }: Coordinates) => void;
}

export default function MapSearchBar({ handleSearch }: MapSearchBarProps) {
    // Zustand store for managing user location
    const { userLocation } = useUserLocationStore();

    // State and refs for managing the search bar text and focus
    const inputRef = useRef<TextInput>(null);
    const [text, setText] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);

    // State for managing autocomplete suggestions
    const [suggestions, setSuggestions] = useState<ParsedSuggestion[]>([]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (text.length > 2 && focused) fetchAutocompleteSuggestions(text);
            else setSuggestions([]);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [text, focused]);

    const fetchAutocompleteSuggestions = async (input: string) => {
        const body = {
            input,
            locationBias: userLocation && {
                circle: {
                    center: {
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    },
                    radius: 10000.0, // 10km bias
                },
            },
        };

        try {
            const res = await fetch(
                "https://places.googleapis.com/v1/places:autocomplete",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(GOOGLE_API_KEY && {
                            "X-Goog-Api-Key": GOOGLE_API_KEY,
                        }),
                        "X-Goog-FieldMask":
                            "suggestions.placePrediction.placeId,suggestions.placePrediction.structuredFormat",
                    },
                    body: JSON.stringify(body),
                }
            );

            const data: GoogleAutocompleteResponse = await res.json();

            const parsed: ParsedSuggestion[] = data.suggestions
                .map((s) => s.placePrediction)
                .filter(Boolean)
                .map((place) => ({
                    placeId: place.placeId,
                    mainText: place.structuredFormat.mainText.text,
                    secondaryText: place.structuredFormat.secondaryText.text,
                }));

            setSuggestions(parsed);
        } catch (err) {
            console.error("Autocomplete error:", err);
        }
    };

    const fetchPlaceDetails = async (placeId: string, mainText: string) => {
        setText(mainText);
        setSuggestions([]);

        try {
            const res = await fetch(
                `https://places.googleapis.com/v1/places/${placeId}?key=${GOOGLE_API_KEY}&languageCode=en`,
                {
                    method: "GET",
                    headers: {
                        "X-Goog-FieldMask": "location",
                    },
                }
            );

            const json = await res.json();

            // Move map first
            handleSearch({
                latitude: json.location.latitude,
                longitude: json.location.longitude,
            });
        } catch (error) {
            console.error("Place details error:", error);
        }
    };

    return (
        <View style={styles.rootContainer}>
            <View style={styles.searchBarContainer}>
                {focused && (
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={ms(18)}
                        color={theme.colors.primary}
                        onPress={() => {
                            inputRef.current?.blur();
                        }}
                    />
                )}
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="Search other places"
                    placeholderTextColor={theme.colors.primaryInactive}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    value={text}
                    onChangeText={setText}
                />
                {text.length > 0 && (
                    <MaterialCommunityIcons
                        name="close"
                        size={ms(18)}
                        color={theme.colors.grayDark}
                        onPress={() => setText("")}
                    />
                )}
            </View>

            {suggestions.length > 0 && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item.placeId}
                        keyboardShouldPersistTaps="handled"
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: theme.colors.gray,
                                }}
                            />
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.suggestionItem}
                                onPress={() => {
                                    inputRef.current?.blur();
                                    fetchPlaceDetails(
                                        item.placeId,
                                        item.mainText
                                    );
                                }}
                            >
                                <Text style={styles.mainText}>
                                    {item.mainText}
                                </Text>
                                <Text style={styles.secondaryText}>
                                    {item.secondaryText}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        gap: "5@ms",
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.full,
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xs,
    },
    input: {
        flex: 1,
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
    },
    dropdown: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.padding.sm,
        boxShadow: "0 0px 8px rgba(0, 0, 0, 0.1)",
    },
    suggestionItem: {
        paddingVertical: theme.padding.xs,
    },
    mainText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.black,
        fontWeight: "bold",
    },
    secondaryText: {
        fontSize: theme.fontSize.xxs,
        color: theme.colors.grayDark,
    },
});

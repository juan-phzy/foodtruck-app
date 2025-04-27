import {
    View,
    Text,
    TextInput,
    KeyboardTypeOptions,
    TouchableOpacity,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { useEffect, useRef, useState } from "react";
import { GoogleAutocompleteResponse, ParsedSuggestion } from "@/types";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

interface EditInfoInputProps {
    readonly title: string;
    readonly value: string;
    readonly keyboardType: KeyboardTypeOptions;
    readonly placeholder: string;
    readonly isAddressInput?: boolean;
    readonly onChange: (text: string, coords?: { latitude: number; longitude: number }) => void;
}


export default function EditInfoInput({
    title,
    value,
    keyboardType,
    placeholder,
    isAddressInput = false,
    onChange
}: EditInfoInputProps) {
    const [suggestions, setSuggestions] = useState<ParsedSuggestion[]>([]);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (value.length > 2 && isAddressInput) {
                fetchAutocompleteSuggestions(value);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [value, isAddressInput]);

    const fetchAutocompleteSuggestions = async (input: string) => {
        const body = {
            input,
            // add location bias later
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

    const fetchPlaceDetails = async (placeId: string, address: string) => {
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
    
            onChange(address, {
                latitude: json.location.latitude,
                longitude: json.location.longitude,
            });
    
            setSuggestions([]);
            inputRef.current?.blur();
        } catch (error) {
            console.error("Place details error:", error);
        }
    };
    

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                ref={inputRef}
                style={styles.input}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
                placeholder={placeholder}
            />
            {isAddressInput && suggestions.length > 0 && (
                <View style={styles.dropdown}>
                    {suggestions.map((item) => (
                        <TouchableOpacity
                            key={item.placeId}
                            style={styles.suggestionItem}
                            onPress={() =>
                                fetchPlaceDetails(
                                    item.placeId,
                                    `${item.mainText}, ${item.secondaryText}`
                                )
                            }
                        >
                            <Text style={styles.mainText}>{item.mainText}</Text>
                            <Text style={styles.secondaryText}>
                                {item.secondaryText}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xs,
        gap: "5@ms",
        backgroundColor: theme.colors.white,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: theme.radius.md,
        borderColor: theme.colors.gray,
        borderWidth: 0.5,
    },
    title: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: theme.colors.white,
        fontSize: theme.fontSize.md,
        color: theme.colors.black,
    },
    dropdown: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.padding.sm,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    suggestionItem: {
        paddingVertical: theme.padding.xs,
    },
    mainText: {
        fontSize: theme.fontSize.sm,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    secondaryText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.grayDark,
    },
});

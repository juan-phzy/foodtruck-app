/**
 * @file SearchBar.tsx
 * @description A search bar component utilizing Google Places Autocomplete for searching locations.
 *
 * Used In:
 * - index.tsx
 *
 * Features:
 * - Uses Google Places API to fetch place details.
 * - Provides real-time search suggestions.
 * - Calls `onSearch` callback with selected location's latitude and longitude.
 * - Implements a gradient background for UI enhancement.
 * - Includes customizable styling for input, dropdown, and shadow effects.
 */

// React & Hooks
import React, { useEffect, useState, useRef } from "react";

// React Native Components
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";

// External Libraries
import {
    GooglePlacesAutocomplete,
    GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";

// Constants & Theme
import theme from "@/assets/theme";
import { Ionicons } from "@expo/vector-icons";
import useMapLayerStore from "@/store/useMapLayerStore";
import * as Font from "expo-font"; // Import Font from Expo
import Mapbox from "@rnmapbox/maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";

// Zustand Store
import useTruckStore from "@/store/useTruckStore";

// Types
type Coordinates = { latitude: number; longitude: number };

// Type Definitions
interface SearchBarProps {
    onSearch: (location: { latitude: number; longitude: number }) => void;
    userLocation: Coordinates | null;
    moveCamera: (
        longitude: number,
        latitude: number,
        zoomLevel?: number
    ) => void;
}

// Google Places API Key (Environment Variable)
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    userLocation,
    moveCamera,
}) => {
    const [showLayerModal, setShowLayerModal] = useState(false);
    const [iconsLoaded, setIconsLoaded] = useState(false);
    const [showClearButton, setShowClearButton] = useState(false);
    const [showBackButton, setShowBackButton] = useState(false);

    const { setMapStyle } = useMapLayerStore();
    const { clearSelectedTruck } = useTruckStore();

    const layerOptions = [
        { id: "street", name: "Street", style: Mapbox.StyleURL.Street },
        { id: "dark", name: "Dark", style: Mapbox.StyleURL.Dark },
        {
            id: "satellite",
            name: "Satellite",
            style: Mapbox.StyleURL.SatelliteStreet,
        },
        { id: "light", name: "Light", style: Mapbox.StyleURL.Light },
    ];

    const googlePlacesRef = useRef<GooglePlacesAutocompleteRef>(null);

    const handleClear = () => {
        if (googlePlacesRef.current) {
            googlePlacesRef.current.clear();
        }
    };

    const handleBack = () => {
        if (googlePlacesRef.current) {
            googlePlacesRef.current.blur();
        }
    };

    // Load the font for Ionicons
    useEffect(() => {
        const loadIcons = async () => {
            await Font.loadAsync(Ionicons.font);
            setIconsLoaded(true);
        };

        loadIcons();
    }, []);

    return (
        <View style={styles.rootContainer}>
            {/* Gradient Background */}
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                locations={[0.2, 1]}
            />
            <SafeAreaView style={styles.safeAreaView}>
                {/* Google Places Autocomplete Search Bar */}
                <GooglePlacesAutocomplete
                    ref={googlePlacesRef}
                    placeholder="Search other places"
                    minLength={2}
                    query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: "en",
                    }}
                    onPress={(data, details = null) => {
                        if (details) {
                            Object.entries(details).forEach(([key, value]) => {
                                console.log(key);
                            });
                        }
                        if (details?.geometry?.location) {
                            const { lat: latitude, lng: longitude } =
                                details.geometry.location;
                            onSearch({ latitude, longitude });
                        }
                    }}
                    styles={{
                        container: {
                            width: "100%",
                        },
                        textInput: {
                            backgroundColor: theme.colors.white,
                            height: ms(40),
                            borderRadius: ms(25),
                            paddingHorizontal: ms(10),
                            marginBottom: ms(10),
                            fontSize: theme.fontSize.xs,
                            shadowColor: theme.colors.black,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                            elevation: 3,
                        },
                        listView: {
                            backgroundColor: theme.colors.white,
                            borderRadius: ms(10),
                            shadowColor: theme.colors.black,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                            elevation: 3,
                        },
                        row: {
                            backgroundColor: theme.colors.white,
                            padding: ms(10),
                            alignItems: "center",
                            borderBottomWidth: ms(1),
                            borderBottomColor: theme.colors.gray,
                        },
                        separator: {
                            height: 0,
                            backgroundColor: theme.colors.gray,
                        },
                    }}
                    textInputProps={{
                        placeholderTextColor: theme.colors.primaryInactive,
                        onFocus: () => {
                            setShowBackButton(true);
                            setShowClearButton(true);
                        },
                        onBlur: () => {
                            setShowBackButton(false);
                            setShowClearButton(false);
                        },
                    }}
                    enablePoweredByContainer={false}
                    onFail={(error) =>
                        console.error("Google Places Error:", error)
                    }
                    renderLeftButton={() => (
                        <TouchableOpacity
                            onPress={handleBack}
                            style={{
                                display: showBackButton ? "flex" : "none",
                                width: ms(40),
                                height: ms(40),
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "flex-start",
                                borderRadius: ms(25),
                                backgroundColor: theme.colors.white,
                                marginRight: ms(5),
                            }}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={ms(25)}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>
                    )}
                    renderRightButton={() => (
                        <TouchableOpacity
                            onPress={handleClear}
                            style={{
                                display: showClearButton ? "flex" : "none",
                                width: ms(40),
                                height: ms(40),
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "flex-start",
                                borderRadius: ms(25),
                                backgroundColor: theme.colors.white,
                                marginLeft: ms(5),
                            }}
                        >
                            <Ionicons
                                name="close"
                                size={ms(25)}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>
                    )}
                />
                {iconsLoaded && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => {
                                if (userLocation) {
                                    clearSelectedTruck();
                                    moveCamera(
                                        userLocation.longitude,
                                        userLocation.latitude,
                                        14
                                    );
                                }
                            }}
                        >
                            <Ionicons
                                name="locate-outline"
                                size={ms(20)}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => setShowLayerModal(!showLayerModal)}
                        >
                            <Ionicons
                                name="layers-outline"
                                size={ms(20)}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>

                        {/* Layer Selection Modal */}
                        {showLayerModal && (
                            <View style={styles.layerModal}>
                                {layerOptions.map((option) => (
                                    <Pressable
                                        key={option.id}
                                        style={styles.layerOption}
                                        onPress={() => {
                                            setMapStyle(option.style);
                                            setShowLayerModal(false);
                                        }}
                                    >
                                        <Text style={styles.layerText}>
                                            {option.name}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

// Styles
const styles = ScaledSheet.create({
    rootContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xl,
        zIndex: 10,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject, // Applies gradient to entire component
    },
    safeAreaView: {
        justifyContent: "flex-end",
        gap: "5@ms",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: "5@ms",
    },
    controlButton: {
        backgroundColor: "white",
        padding: theme.padding.sm,
        borderRadius: "30@ms",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 2px 12px 1px rgba(0, 0, 0, .2)",
    },
    layerModal: {
        position: "absolute",
        top: "50@ms",
        right: 0,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        padding: theme.padding.sm,
        shadowColor: theme.colors.black,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    layerOption: {
        padding: theme.padding.xs,
    },
    layerText: {
        fontSize: theme.fontSize.sm,
        fontWeight: "medium",
        color: theme.colors.primary,
    },
});

export default SearchBar;

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
import React, { useState } from "react";

// React Native Components
import { Pressable, StyleSheet, Text, View } from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";

// External Libraries
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// Constants & Theme
import theme from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import useMapLayerStore from "@/store/useMapLayerStore";

import Mapbox from "@rnmapbox/maps";
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

    const { setMapStyle } = useMapLayerStore();
    const { clearSelectedTruck } = useTruckStore();

    const layerOptions = [
        { id: "street", name: "Street", style: Mapbox.StyleURL.Street },
        { id: "dark", name: "Dark", style: Mapbox.StyleURL.Dark },
        { id: "satellite", name: "Satellite", style: Mapbox.StyleURL.SatelliteStreet },
    ];

    return (
        <View style={styles.container}>
            {/* Gradient Background */}
            <LinearGradient
                colors={["rgba(255, 132, 0, 0.9)", "rgba(255, 132, 0, 0)"]}
                locations={[0.2, 0.8]}
                style={styles.gradient}
            />

            {/* Google Places Autocomplete Search Bar */}
            <GooglePlacesAutocomplete
                placeholder="Search other places"
                minLength={2} // Minimum characters before search triggers
                fetchDetails={true} // Fetches full place details
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: "en",
                }}
                onPress={(data, details = null) => {
                    if (details?.geometry?.location) {
                        const { lat: latitude, lng: longitude } =
                            details.geometry.location;
                        onSearch({ latitude, longitude }); // Pass selected location to parent component
                    }
                }}
                styles={{
                    container: {
                        width: "100%",
                        shadowColor: theme.colors.black,
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        shadowOffset: { width: 0, height: 2 },
                        elevation: 3, // Android shadow effect
                    },
                    textInput: styles.inputText,
                    listView: {
                        backgroundColor: "#f8f8f8",
                        borderRadius: 10,
                        marginTop: 0,
                    },
                    row: {
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: 10,
                        backgroundColor: "#fff",
                        borderBottomWidth: 0.5,
                        borderBottomColor: "rgba(0,0,0,.1)",
                    },
                    description: {
                        fontSize: 12,
                        color: "#333",
                    },
                }}
                textInputProps={{
                    placeholderTextColor: theme.colors.primaryInactive, // Custom placeholder color
                }}
                enablePoweredByContainer={false} // Removes "Powered by Google" branding
                onFail={(error) => console.error("Google Places Error:", error)} // Error handling
            />

            <View style={styles.buttonContainer}>
                <Pressable
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
                        name="locate"
                        size={20}
                        color={theme.colors.primary}
                    />
                </Pressable>

                <Pressable
                    style={styles.controlButton}
                    onPress={() => setShowLayerModal(true)}
                >
                    <Ionicons
                        name="layers-outline"
                        size={20}
                        color={theme.colors.primary}
                    />
                </Pressable>
            </View>

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
                            <Text style={styles.layerText}>{option.name}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 5,
        position: "absolute",
        top: 0,
        paddingTop: 75,
        paddingBottom: 60,
        paddingHorizontal: 10,
        width: "100%",
        alignSelf: "center",
        zIndex: 10, // Ensures it appears above other components
    },
    gradient: {
        ...StyleSheet.absoluteFillObject, // Applies gradient to entire component
    },
    inputText: {
        flex: 1,
        height: 40,
        paddingHorizontal: 15,
        borderRadius: 20,
        fontSize: 14,
        color: theme.colors.black,
    },

    //----------------
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        zIndex: 100,
    },

    controlButton: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },

    layerModal: {
        position: "absolute",
        top: 140,
        right: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        zIndex: 101,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },

    layerOption: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    layerText: {
        fontSize: 14,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
});

export default SearchBar;

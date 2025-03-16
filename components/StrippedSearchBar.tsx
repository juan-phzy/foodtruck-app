// React & Hooks
import React, { useEffect, useState } from "react";

// React Native Components
import {StyleSheet, View} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";

// External Libraries
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// Constants & Theme
import theme from '@/assets/theme';
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font"; // Import Font from Expo


/*Removed Mapbox functionality because it wouldn't make sense
to have it on the second search page when it's already on the first, but left in Google
Places functionality */
interface StrippedSearchBarProps {

}

// Google Places API Key (Environment Variable)
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const StrippedSearchBar: React.FC<StrippedSearchBarProps> = ({

}) => {
    const [iconsLoaded, setIconsLoaded] = useState(false);


    // Load the font for Ionicons
    useEffect(() => {
        const loadIcons = async () => {
            await Font.loadAsync(Ionicons.font);
            setIconsLoaded(true);
        };

        loadIcons();
    }, []);

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
                placeholder="Search Trucks"
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
                        // Pass selected location to parent component
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
        zIndex: 10, 
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
});

export default StrippedSearchBar;
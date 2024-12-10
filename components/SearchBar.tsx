import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CircleButton from "./CircleButton";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/theme/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface SearchBarProps {
    onSearch: (location: { latitude: number; longitude: number }) => void;
}
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <View style={styles.container}>
            {/* Gradient Background */}
            <LinearGradient
                colors={["rgba(255, 132, 0, 0.9)", "rgba(255, 132, 0, 0)"]}
                locations={[0.2, .8]}
                style={styles.gradient}
            />
            {/* Google Places Autocomplete */}
            <GooglePlacesAutocomplete
                placeholder="Search other places"
                minLength={2}
                fetchDetails={true}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: "en",
                }}
                onPress={(data, details = null) => {
                    const latitude = details?.geometry?.location?.lat || 0;
                    const longitude = details?.geometry?.location?.lng || 0;
                    onSearch({ latitude, longitude });
                }}
                styles={{
                    container: {
                        width: "100%",
                        shadowColor: theme.colors.black,
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        shadowOffset: { width: 0, height: 2 },
                        elevation: 3,
                    },
                    textInput: styles.inputText,
                    listView: {
                        backgroundColor: "#f8f8f8",
                        borderRadius: 10,
                        marginTop: 0,
                    },
                    row: {
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: 10,
                        margin: 0,
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
                    placeholderTextColor: theme.colors.primaryInactive,
                }}
                enablePoweredByContainer={false}
                onFail={(error) => console.error(error)}
            />
            <View style={styles.togglesContainer}>
                <CircleButton
                    icon={
                        <Ionicons
                            name="layers"
                            size={25}
                            color={theme.colors.primary}
                        />
                    }
                    onPress={() => {}}
                />
                <CircleButton
                    icon={
                        <Ionicons
                            name="location"
                            size={25}
                            color={theme.colors.primary}
                        />
                    }
                    onPress={() => {}}
                />
            </View>
        </View>
    );
};

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
        ...StyleSheet.absoluteFillObject,
    },
    inputText: {
        flex: 1,
        height: 40,
        paddingHorizontal: 15,
        borderRadius: 20,
        fontSize: 14,
        color: theme.colors.black,
    },
	togglesContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		width: "100%",
		gap: 10,
	},
});

export default SearchBar;

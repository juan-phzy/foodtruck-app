import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CircleButton from "./CircleButton";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/theme/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface SearchBarProps {
    onSearch: (location: { latitude: number; longitude: number }) => void;
    onLocate: () => void;
    changeMapToSatellite: () => void;
    changeMapToDetailed: () => void;
    changeMapToRegular: () => void;
    currentMap: string;
}
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    onLocate,
    changeMapToDetailed,
    changeMapToRegular,
    changeMapToSatellite,
    currentMap
}) => {
    const [showLayerModal, setShowLayerModal] = useState(false);

    return (
        <View style={styles.container}>
            {/* Gradient Background */}
            <LinearGradient
                colors={["rgba(255, 132, 0, 0.9)", "rgba(255, 132, 0, 0)"]}
                locations={[0.2, 0.8]}
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
                    const latitude = details?.geometry?.location?.lat ?? 0;
                    const longitude = details?.geometry?.location?.lng ?? 0;
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
                    onPress={() => setShowLayerModal(!showLayerModal)}
                />
                <CircleButton
                    icon={
                        <Ionicons
                            name="location"
                            size={25}
                            color={theme.colors.primary}
                        />
                    }
                    onPress={onLocate}
                />
            </View>

            {/* Layer Modal */}
            {showLayerModal && (
                <View style={styles.layerModal}>
                    <Pressable
                        onPress={changeMapToRegular}
                        style={styles.layerOption}
                    >
                        <Text style={[styles.layerOptionText,{
                            color: currentMap === "mutedStandard" ? theme.colors.primary : theme.colors.blackInactive
                        }]}>Regular</Text>
                    </Pressable>
                    <Pressable
                        onPress={changeMapToDetailed}
                        style={[
                            styles.layerOption,
                            {
                                borderTopWidth: 0.5,
                                borderBottomWidth: 0.5,
                                borderBottomColor: "rgba(0,0,0,.1)",
                                borderTopColor: "rgba(0,0,0,.1)",
                            },
                        ]}
                    >
                        <Text style={[styles.layerOptionText,{
                            color: currentMap === "standard" ? theme.colors.primary : theme.colors.blackInactive
                        }]}>Detailed</Text>
                    </Pressable>
                    <Pressable
                        onPress={changeMapToSatellite}
                        style={styles.layerOption}
                    >
                        <Text style={[styles.layerOptionText,{
                            color: currentMap === "hybrid" ? theme.colors.primary : theme.colors.blackInactive
                        }]}>Satellite</Text>
                    </Pressable>
                </View>
            )}
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
    layerModal: {
        position: "absolute",
        bottom: -100,
        right: 10,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    layerOption: {
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    layerOptionText: {
        fontSize: 16,
    },
});

export default SearchBar;

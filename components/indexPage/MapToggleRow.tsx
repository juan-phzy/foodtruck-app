// React & Hooks
import { useState } from "react";

// React Native Components
import { View, Text, TouchableOpacity, Pressable } from "react-native";

// Sizing & Theming
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ms, ScaledSheet } from "react-native-size-matters";
import Mapbox from "@rnmapbox/maps";
import theme from "@/assets/theme";

// Zustand State Management
import useTruckStore from "@/store/useTruckStore";
import useMapLayerStore from "@/store/useMapLayerStore";
import useUserLocationStore from "@/store/useUserLocationStore";

interface MapToggleRowProps {
    readonly moveCamera?: (
        longitude: number,
        latitude: number,
        zoomLevel?: number
    ) => void;
}

export default function MapToggleRow({ moveCamera }: MapToggleRowProps) {
    const { userLocation } = useUserLocationStore();

    const [showLayerModal, setShowLayerModal] = useState(false);

    const { clearSelectedTruck } = useTruckStore();

    const { setMapStyle } = useMapLayerStore();

    const layerOptions = [
        { id: "street", name: "Street", style: Mapbox.StyleURL.Street },
        {
            id: "satellite",
            name: "Satellite",
            style: Mapbox.StyleURL.SatelliteStreet,
        },
        { id: "light", name: "Light", style: Mapbox.StyleURL.Light },
        { id: "dark", name: "Dark", style: Mapbox.StyleURL.Dark },
    ];

    function getMapIconName(
        style: string
    ): keyof typeof MaterialCommunityIcons.glyphMap {
        switch (style) {
            case Mapbox.StyleURL.Street:
                return "road-variant";
            case Mapbox.StyleURL.Dark:
                return "moon-waxing-crescent";
            case Mapbox.StyleURL.SatelliteStreet:
                return "earth";
            case Mapbox.StyleURL.Light:
                return "weather-sunny";
            default:
                return "map"; // fallback icon
        }
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => {
                        if (userLocation) {
                            clearSelectedTruck();
                            moveCamera?.(
                                userLocation.longitude,
                                userLocation.latitude,
                                14
                            );
                        }
                    }}
                >
                    <MaterialCommunityIcons
                        name="crosshairs-gps"
                        size={ms(20)}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => setShowLayerModal(!showLayerModal)}
                >
                    <MaterialCommunityIcons
                        name="layers-outline"
                        size={ms(20)}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            </View>
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
                            <MaterialCommunityIcons
                                name={getMapIconName(option.style)}
                                size={ms(20)}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.layerText}>{option.name}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        gap: "10@ms",
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "10@ms",
    },
    controlButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.white,
        padding: theme.padding.xs,
        borderRadius: theme.radius.full,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    layerModal: {
        alignSelf: "flex-end",
        width: "82@ms",
        gap: "1@ms",
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radius.sm,
        overflow: "hidden",
    },
    layerOption: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xs,
        justifyContent: "center",
        alignItems: "center",
        gap: "5@ms",
    },
    layerText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.primary,
    },
});

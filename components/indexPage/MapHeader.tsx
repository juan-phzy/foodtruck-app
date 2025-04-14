// React & Hooks
import { useState } from "react";

// React Native Components
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

// Expo Components
import { LinearGradient } from "expo-linear-gradient";

// Sizing & Theming
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

// Zustand State Management
import useTruckStore from "@/store/useTruckStore";

// Custom Components
import MapSearchBar from "@/components/search/MapSearchBar";
import MapToggleRow from "./MapToggleRow";

// Environment Variables & Types
const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_KEY;
type Coordinates = { latitude: number; longitude: number };

interface MapHeaderProps {
    readonly handleSearch: (location: Coordinates) => void;
    readonly moveCamera: (
        longitude: number,
        latitude: number,
        zoomLevel?: number
    ) => void;
}

export default function MapHeader({
    handleSearch,
    moveCamera,
}: MapHeaderProps) {
    const inset = useSafeAreaInsets();

    return (
        <View
            style={[styles.rootContainer, { paddingTop: inset.top + ms(24) }]}
        >
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                locations={[0.2, 1]}
            />

            <MapSearchBar handleSearch={handleSearch} />
            <MapToggleRow moveCamera={moveCamera} />
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: theme.padding.sm,
        zIndex: 10,
        justifyContent: "flex-end",
        gap: "5@ms",
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});

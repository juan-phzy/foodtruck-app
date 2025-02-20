// React & Hooks
import React, { useEffect, useRef, useState } from "react";

// React Native Components
import { StyleSheet, View, Alert } from "react-native";

// Expo Location API
import * as Location from "expo-location";

// Custom Components
import SearchBar from "@/components/SearchBar";
import NearbyTrucksCard from "@/components/NearbyTrucksCard";
import SelectedTruckCard from "@/components/SelectedTruckCard";
import CategoryModal from "@/components/CategoryModal";
import MenuModal from "@/components/MenuModal";
import TruckPage from "@/components/TruckPage";

// Constants & Types
import { FOOD_TRUCKS } from "@/constants";

// Mapbox Imports
import Mapbox, {
    Camera,
    LocationPuck,
    MapView,
    Images,
    ShapeSource,
    SymbolLayer,
    CircleLayer,
} from "@rnmapbox/maps";
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY ?? "");

// Geospatial Utilities
import { featureCollection, point } from "@turf/helpers";

// Assets
import icon from "@/assets/images/icon.png";

// State Management (Zustand)
import useTruckStore from "@/store/useTruckStore";

export default function Index() {
    const {
        selectedTruck,
        setSelectedTruckId,
        clearSelectedTruck,
    } = useTruckStore();

    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [showTruckPage, setShowTruckPage] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const cameraRef = useRef<Camera>(null);

    // Helper function to move the camera
    const moveCamera = (longitude: number, latitude: number, zoomLevel: number = 14) => {
        cameraRef.current?.setCamera({
            centerCoordinate: [longitude, latitude],
            zoomLevel,
            animationDuration: 500,
        });
    };

    // Fetch User Location on Initial Load
    useEffect(() => {
        const getUserLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert("Location Permission Required", "Please enable location services for best experience.");
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setUserLocation({ latitude, longitude });
                moveCamera(longitude, latitude);
            } catch (error) {
                console.error("Error getting user location:", error);
            }
        };

        getUserLocation();
    }, []);

    // Compute food truck features only once
    const truckFeatures = featureCollection(
        FOOD_TRUCKS.map((truck) =>
            point([truck.coordinates.longitude, truck.coordinates.latitude], { id: truck.id })
        )
    );

    // Handle Google Places Search
    const handleSearch = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        moveCamera(longitude, latitude);
    };

    // Camera Updates on Truck Selection
    useEffect(() => {
        if (selectedTruck) {
            moveCamera(selectedTruck.coordinates.longitude, selectedTruck.coordinates.latitude - 0.0012, 16);
        } else {
            moveCamera(userLocation?.longitude ?? -122.4194, userLocation?.latitude ?? 37.7749, 14); // Defaults to SF
        }
    }, [selectedTruck]);

    return (
        <View style={styles.container}>
            {/* Category Modal */}
            {showCategoryModal && (
                <CategoryModal
                    setCategoryFilters={setCategoryFilters}
                    categoryFilters={categoryFilters}
                    setShowCategoryModal={setShowCategoryModal}
                />
            )}

            {/* Menu Modal */}
            {showMenuModal && selectedTruck && (
                <MenuModal closeMenu={() => setShowMenuModal(false)} truck={selectedTruck} />
            )}

            {/* Truck Page */}
            {showTruckPage && selectedTruck && (
                <TruckPage closeTruckPage={() => setShowTruckPage(false)} truck={selectedTruck} />
            )}

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Map */}
            <MapView style={styles.map} styleURL={Mapbox.StyleURL.Street} onPress={clearSelectedTruck} scaleBarEnabled={false}>
                <Camera ref={cameraRef} />
                <LocationPuck {...locationPuckStyle} />

                <ShapeSource
                    id="foodTrucks"
                    cluster
                    shape={truckFeatures}
                    onPress={(e) => {
                        const truckId = e.features?.[0]?.properties?.id;
                        if (truckId) setSelectedTruckId(truckId);
                    }}
                >
                    <CircleLayer id="clusters" filter={["has", "point_count"]} style={circleLayerStyle} />
                    <SymbolLayer id="clusters-count" style={symbolCountStyle} />
                    <SymbolLayer id="foodTruckIcons" filter={["!", ["has", "point_count"]]} style={symbolLayerStyle} />
                    <Images images={{ icon }} />
                </ShapeSource>
            </MapView>

            {/* Conditional Card Rendering */}
            {selectedTruck ? (
                <SelectedTruckCard
                    truck={selectedTruck}
                    openMenu={() => setShowMenuModal(true)}
                    openTruckPage={() => setShowTruckPage(true)}
                />
            ) : (
                <NearbyTrucksCard
                    isCategoryActive={categoryFilters.length > 0}
                    isExpanded={isExpanded}
                    onToggleExpand={() => setIsExpanded(!isExpanded)}
                    trucks={FOOD_TRUCKS.filter(
                        (truck) =>
                            categoryFilters.length === 0 || truck.categories.some((c) => categoryFilters.includes(c))
                    )}
                    showCategories={() => setShowCategoryModal(true)}
                />
            )}
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});

// Mapbox Layer Styles
const circleLayerStyle = {
    circlePitchAlignment: "map",
    circleColor: "orange",
    circleRadius: 30,
    circleOpacity: 0.4,
    circleStrokeWidth: 2,
    circleStrokeColor: "orange",
};

const symbolCountStyle = {
    textField: ["get", "point_count"],
    textColor: "white",
    textSize: 25,
};

const symbolLayerStyle = {
    iconImage: "icon",
    iconSize: 0.05,
};

const locationPuckStyle = {
    pulsing: { isEnabled: true, color: "orange" },
};
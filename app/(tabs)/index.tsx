// React & Hooks
import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";

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

// Zustand State Management
import useTruckStore from "@/store/useTruckStore";
import useFilterStore from "@/store/useFilterStore";
import useMenuModalStore from "@/store/useMenuModalStore";

// Types
type Coordinates = { latitude: number; longitude: number };

export default function Index() {
    // Zustand store for managing selected truck
    const { selectedTruck, setSelectedTruckId, clearSelectedTruck } =
        useTruckStore();
    const { categoryFilters, showCategoryModal, setShowCategoryModal } =
        useFilterStore();
    const { showMenuModal, toggleMenuModal } = useMenuModalStore();

    // State Hooks
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
    const [showTruckPage, setShowTruckPage] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Map Camera Reference
    const cameraRef = useRef<Camera>(null);

    /**
     * Moves the Mapbox camera to a specific location.
     * Uses useCallback to prevent re-renders.
     */
    const moveCamera = useCallback(
        (longitude: number, latitude: number, zoomLevel: number = 14) => {
            console.log("Moving camera to:", {
                latitude,
                longitude,
                zoomLevel,
            });
            cameraRef.current?.setCamera({
                centerCoordinate: [longitude, latitude],
                zoomLevel,
                animationDuration: 500,
            });
        },
        []
    );

    /**
     * Fetch User Location on Initial Load.
     */
    useEffect(() => {
        const getUserLocation = async () => {
            try {
                console.log("Requesting location permissions...");
                const { status } =
                    await Location.requestForegroundPermissionsAsync();

                if (status !== "granted") {
                    Alert.alert(
                        "Location Permission Required",
                        "Please enable location services for the best experience."
                    );
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                console.log("User location obtained:", { latitude, longitude });

                setUserLocation({ latitude, longitude });
                moveCamera(longitude, latitude);
            } catch (error) {
                console.error("Error getting user location:", error);
            }
        };

        getUserLocation();
    }, [moveCamera]);

    /**
     * Filters and computes food truck features only when dependencies change.
     * Uses useMemo to optimize re-renders.
     */
    const truckFeatures = useMemo(
        () =>
            featureCollection(
                FOOD_TRUCKS.filter(
                    (truck) =>
                        categoryFilters.length === 0 ||
                        truck.categories.some((c) =>
                            categoryFilters.includes(c)
                        )
                ).map((truck) =>
                    point(
                        [
                            truck.coordinates.longitude,
                            truck.coordinates.latitude,
                        ],
                        {
                            id: truck.id,
                        }
                    )
                )
            ),
        [categoryFilters]
    );

    /**
     * Handles Google Places Search and moves the camera.
     */
    const handleSearch = useCallback(
        ({ latitude, longitude }: Coordinates) => {
            console.log("Search triggered, moving camera:", {
                latitude,
                longitude,
            });
            moveCamera(longitude, latitude);
        },
        [moveCamera]
    );

    /**
     * Camera Updates on Truck Selection.
     */
    useEffect(() => {
        if (selectedTruck) {
            console.log("Truck selected, moving camera:", selectedTruck.name);
            moveCamera(
                selectedTruck.coordinates.longitude,
                selectedTruck.coordinates.latitude - 0.0012,
                16
            );
        } else {
            console.log("No truck selected, resetting camera...");
            moveCamera(
                userLocation?.longitude ?? -122.4194, // Default to SF
                userLocation?.latitude ?? 37.7749,
                14
            );
        }
    }, [selectedTruck, userLocation, moveCamera]);

    return (
        <View style={styles.container}>
            {/* Category Modal */}
            {showCategoryModal && <CategoryModal />}

            {/* Menu Modal */}
            {showMenuModal && selectedTruck && (
                <MenuModal truck={selectedTruck} />
            )}

            {/* Truck Page */}
            {showTruckPage && selectedTruck && (
                <TruckPage
                    closeTruckPage={() => setShowTruckPage(false)}
                    truck={selectedTruck}
                />
            )}

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Map */}
            <MapView
                style={styles.map}
                styleURL={Mapbox.StyleURL.Street}
                onPress={clearSelectedTruck}
                scaleBarEnabled={false}
            >
                <Camera ref={cameraRef} />
                <LocationPuck {...locationPuckStyle} />

                <ShapeSource
                    id="foodTrucks"
                    cluster
                    shape={truckFeatures}
                    onPress={(e) => {
                        const truckId = e.features?.[0]?.properties?.id;
                        if (truckId) {
                            console.log("Truck pressed, selecting:", truckId);
                            setSelectedTruckId(truckId);
                        }
                    }}
                >
                    <CircleLayer
                        id="clusters"
                        filter={["has", "point_count"]}
                        style={circleLayerStyle}
                    />
                    <SymbolLayer id="clusters-count" style={symbolCountStyle} />
                    <SymbolLayer
                        id="foodTruckIcons"
                        filter={["!", ["has", "point_count"]]}
                        style={symbolLayerStyle}
                    />
                    <Images images={{ icon }} />
                </ShapeSource>
            </MapView>

            {/* Conditional Card Rendering */}
            {selectedTruck ? (
                <SelectedTruckCard
                    truck={selectedTruck}
                    openMenu={() => toggleMenuModal()}
                    openTruckPage={() => setShowTruckPage(true)}
                />
            ) : (
                <NearbyTrucksCard
                    isCategoryActive={categoryFilters.length > 0}
                    isExpanded={isExpanded}
                    onToggleExpand={() => setIsExpanded(!isExpanded)}
                    trucks={FOOD_TRUCKS.filter(
                        (truck) =>
                            categoryFilters.length === 0 ||
                            truck.categories.some((c) =>
                                categoryFilters.includes(c)
                            )
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

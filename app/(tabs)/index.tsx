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

// Geospatial Utilities
import { featureCollection, point } from "@turf/helpers";

// Assets
import icon from "@/assets/images/icon.png";

// Zustand State Management
import useTruckStore from "@/store/useTruckStore";
import useFilterStore from "@/store/useFilterStore";
import useMenuModalStore from "@/store/useMenuModalStore";
import useMapLayerStore from "@/store/useMapLayerStore";

// Types
type Coordinates = { latitude: number; longitude: number };

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY ?? "");

export default function Index() {
    // Zustand store for managing selected truck
    const {
        selectedTruck,
        showTruckPage,
        setSelectedTruckId,
        clearSelectedTruck,
    } = useTruckStore();
    const { categoryFilters, showCategoryModal } = useFilterStore();
    const { showMenuModal } = useMenuModalStore();
    const { mapStyle } = useMapLayerStore();

    // State for user location
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

    // Map Camera Reference
    const cameraRef = useRef<Camera>(null);

    /**
     * Moves the Mapbox camera to a specific location.
     */
    const moveCamera = useCallback(
        (longitude: number, latitude: number, zoomLevel: number = 14) => {
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
                setUserLocation({ latitude, longitude });
                moveCamera(longitude, latitude);
            } catch (error) {
                console.error("Error getting user location:", error);
            }
        };

        getUserLocation();
    }, [moveCamera]);

    /**
     * Moves the camera when a truck is selected.
     */
    useEffect(() => {
        if (selectedTruck) {
            moveCamera(
                selectedTruck.coordinates.longitude,
                selectedTruck.coordinates.latitude - 0.0012,
                16
            );
        } else {
            // Zoom out while keeping the current location
            cameraRef.current?.zoomTo(14, 500);
        }
    }, [selectedTruck, moveCamera]);

    /**
     * Handles Google Places Search and moves the camera.
     */
    const handleSearch = useCallback(
        ({ latitude, longitude }: Coordinates) => {
            moveCamera(longitude, latitude);
            setSelectedTruckId(null);
        },
        [moveCamera, setSelectedTruckId]
    );

    /**
     * Filters and computes food truck features only when dependencies change.
     */
    const truckFeatures = useMemo(() => {
        const filteredTrucks =
            categoryFilters.length === 0
                ? FOOD_TRUCKS
                : FOOD_TRUCKS.filter((truck) =>
                      truck.categories.some((c) => categoryFilters.includes(c))
                  );

        return {
            filteredTrucks,
            featureCollection: featureCollection(
                filteredTrucks.map((truck) =>
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
        };
    }, [categoryFilters]);

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
                <TruckPage truck={selectedTruck} />
            )}

            {/* Search Bar */}
            <SearchBar
                onSearch={handleSearch}
                userLocation={userLocation}
                moveCamera={moveCamera}
            />

            {/* Map */}
            <MapView
                style={styles.map}
                styleURL={mapStyle}
                onPress={clearSelectedTruck}
                scaleBarEnabled={false}
                logoEnabled={false}
            >
                <Camera ref={cameraRef} />
                <LocationPuck pulsing={locationPuckStyle.pulsing} />

                <ShapeSource
                    id="foodTrucks"
                    cluster
                    shape={truckFeatures.featureCollection}
                    onPress={(e) => {
                        const truckId = e.features?.[0]?.properties?.id;
                        if (truckId) {
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
                <SelectedTruckCard truck={selectedTruck} />
            ) : (
                <NearbyTrucksCard trucks={truckFeatures.filteredTrucks} />
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

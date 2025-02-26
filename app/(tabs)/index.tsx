// React & Hooks
import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";

// React Native Components
import { ActivityIndicator, StyleSheet, View } from "react-native";

// Custom Components
import SearchBar from "@/components/SearchBar";
import NearbyTrucksCard from "@/components/NearbyTrucksCard";
import SelectedTruckCard from "@/components/SelectedTruckCard";
import CategoryModal from "@/components/CategoryModal";
import MenuModal from "@/components/MenuModal";
import TruckPage from "@/components/TruckPage";

// Constants & Types & Themes
import { FOOD_TRUCKS } from "@/constants";
import theme from "@/theme/theme";

// Mapbox Imports
import Mapbox, {
    Camera,
    LocationPuck,
    MapView,
    Images,
    ShapeSource,
    SymbolLayer,
    CircleLayer,
    locationManager,
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

    // State for map load status and component mount status
    const [mapLoaded, setMapLoaded] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const isMounted = useRef(true);

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
        if (mapLoaded) {
            const getUserLocation = async () => {
                try {
                    const location =
                        await locationManager.getLastKnownLocation();
                    if (location && isMounted.current) {
                        const { latitude, longitude } = location.coords;
                        console.log("User Location:", { latitude, longitude });
                        setUserLocation({ latitude, longitude });
                        moveCamera(longitude, latitude);
                        setShowMap(true);
                    } else {
                        console.warn("No last known location available");
                    }
                } catch (error) {
                    console.error("Error getting user location:", error);
                }
            };

            getUserLocation();
        }
    }, [mapLoaded, moveCamera]);

    /**
     * Moves the camera when a truck is selected.
     */
    useEffect(() => {
        if (selectedTruck && mapLoaded) {
            moveCamera(
                selectedTruck.coordinates.longitude,
                selectedTruck.coordinates.latitude - 0.0012,
                16
            );
        } else {
            cameraRef.current?.zoomTo(14, 500);
        }
    }, [selectedTruck, moveCamera, mapLoaded]);

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

    /**
     * Ensures the component is still mounted
     */
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

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
                onDidFinishLoadingMap={() => {
                    console.log("Map Loaded");
                    setMapLoaded(true);
                }}
                onDidFinishLoadingStyle={() => {
                    console.log("Style Loaded");
                }}
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
            {!showMap && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.primary}
                    />
                </View>
            )}

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
    container: {  position: "relative", flex: 1 },
    map: { flex: 1 },
    loadingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 1)", // Light overlay
    }
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

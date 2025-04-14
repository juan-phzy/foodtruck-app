// React & Hooks
import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";

// React Native Components
import { ActivityIndicator, View } from "react-native";

// Custom Components
import NearbyTrucks from "@/components/indexPage/NearbyTrucks";
import SelectedTruck from "@/components/indexPage/SelectedTruck";
import CategoryModal from "@/components/modals/CategoryModal";
import MenuModal from "@/components/modals/MenuModal";
import TruckModal from "@/components/modals/TruckModal";
import MapHeader from "@/components/indexPage/MapHeader";

// Constants & Types & Themes
import { ms, ScaledSheet } from "react-native-size-matters";
import { Coordinates } from "@/types";
import { FOOD_TRUCKS } from "@/constants";
import theme from "@/assets/theme";

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
import useUserLocationStore from "@/store/useUserLocationStore";

// Mapbox Access Token
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY ?? "");

export default function Index() {
    console.log("____________________________________________");
    console.log("(public)/index.tsx: Entered Public Home Page");

    // Zustand store for managing selected truck
    const {
        selectedTruck,
        showTruckModal,
        setSelectedTruckId,
        clearSelectedTruck,
    } = useTruckStore();

    // Zustand store for managing category filters and modals
    const { categoryFilters, showCategoryModal } = useFilterStore();

    // Zustand store for managing menu modal visibility
    const { showMenuModal } = useMenuModalStore();

    // Zustand store for managing map layer style
    const { mapStyle } = useMapLayerStore();

    // State for user location
    const { userLocation, fetchUserLocation } = useUserLocationStore();

    // State for map load status and component mount status
    const [mapLoaded, setMapLoaded] = useState(false);
    const [showMap, setShowMap] = useState(false);

    // Map Camera Reference
    const cameraRef = useRef<Camera>(null);

    // Moves the Mapbox camera to a specific location.
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

    // Fetches the user's location and sets it in the Zustand store.
    useEffect(() => {
        if (mapLoaded) {
            console.log("(public)/index.tsx: Map Loaded, Fetching User Location");
            fetchUserLocation();
        }
    }, [mapLoaded]);

    // Activates the map once a user location is found.
    useEffect(() => {
        console.log("(public)/index.tsx: User Location: ", userLocation);
        if (userLocation) {
            console.log("(public)/index.tsx: User Location Found, Moving Camera");
            moveCamera(userLocation.longitude, userLocation.latitude);
            setTimeout(() => setShowMap(true), 100);
        }
    }, [userLocation]);

    // Moves the camera when a truck is selected.
    useEffect(() => {
        if (selectedTruck && mapLoaded) {
            moveCamera(
                selectedTruck.coordinates.longitude,
                selectedTruck.coordinates.latitude - ms(0.0007),
                16
            );
        } else {
            cameraRef.current?.zoomTo(14, 500);
        }
    }, [selectedTruck, moveCamera, mapLoaded]);

    // Handles Map Search and moves the camera to searched location.
    const handleSearch = useCallback(
        ({ latitude, longitude }: Coordinates) => {
            console.log("(public)/index.tsx: Handle Search called");
            moveCamera(longitude, latitude);
            clearSelectedTruck();
        },
        [moveCamera, setSelectedTruckId]
    );

    // Filters and computes food truck features only when dependencies change.
    const truckFeatures = useMemo(() => {
        // Then filter trucks based on category filters
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
        <View style={styles.rootContainer}>
            {/* Search Bar */}
            <MapHeader
                handleSearch={handleSearch}
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
                    console.log("(public)/index.tsx: Map Loaded");
                    setMapLoaded(true);
                }}
                onDidFinishLoadingStyle={() => {
                    console.log("(public)/index.tsx: Map Style Loaded");
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

            {/* Loading Indicator */}
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
                <SelectedTruck truck={selectedTruck} />
            ) : (
                <NearbyTrucks trucks={truckFeatures.filteredTrucks} />
            )}

            {/* Category Modal */}
            {showCategoryModal && <CategoryModal />}

            {/* Menu Modal */}
            {showMenuModal && selectedTruck && (
                <MenuModal truck={selectedTruck} />
            )}

            {/* Truck Page */}
            {showTruckModal && selectedTruck && (
                <TruckModal truck={selectedTruck} />
            )}
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
    },
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
        backgroundColor: theme.colors.white,
    },
});

const circleLayerStyle = {
    circlePitchAlignment: "map",
    circleColor: theme.colors.primary,
    circleRadius: ms(30),
    circleOpacity: 0.65,
    circleStrokeWidth: ms(3),
    circleStrokeColor: theme.colors.primary,
};

const symbolCountStyle = {
    textField: ["get", "point_count"],
    textColor: theme.colors.white,
    textSize: ms(25),
};

const symbolLayerStyle = {
    iconImage: "icon",
    iconSize: ms(0.05),
};

const locationPuckStyle = {
    pulsing: { isEnabled: true, color: theme.colors.primary },
};

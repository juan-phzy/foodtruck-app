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
import SearchBar from "@/components/search/SearchBar";
import NearbyTrucks from "@/components/indexPage/NearbyTrucks";
import SelectedTruck from "@/components/indexPage/SelectedTruck";
import CategoryModal from "@/components/modals/CategoryModal";
import MenuModal from "@/components/modals/MenuModal";
import TruckModal from "@/components/modals/TruckModal";

// Constants & Types & Themes
import { ms, ScaledSheet } from "react-native-size-matters";
import { FOOD_TRUCKS } from "@/constants";
import theme from "@/assets/theme";
import * as Location from 'expo-location';

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
        showTruckModal,
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
            // Ask for location permissions
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.warn('Permission to access location was denied');
              return;
            }
    
            // Get user's current location
            const location = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
            });
    
            if (location && isMounted.current) {
              const { latitude, longitude } = location.coords;
              console.log('User Location:', { latitude, longitude });
              setUserLocation({ latitude, longitude });
              moveCamera(longitude, latitude);
              setTimeout(() => setShowMap(true), 500);
            } else {
              console.warn('No location data available');
            }
          } catch (error) {
            console.error('Error getting user location:', error);
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
                selectedTruck.coordinates.latitude - ms(0.0007),
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
            console.log("Handle Search called")
            moveCamera(longitude, latitude);
            setSelectedTruckId(null);
        },
        [moveCamera, setSelectedTruckId]
    );

    /**
     * Filters and computes food truck features only when dependencies change.
     */
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
                        { id: truck.id }
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
        <View style={styles.rootContainer}>
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
    rootContainer: { flex: 1 },
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

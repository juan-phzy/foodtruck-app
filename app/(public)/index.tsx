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

// Zustand State Management
import useTruckStore from "@/store/useTruckStore";
import useFilterStore from "@/store/useFilterStore";
import useMenuModalStore from "@/store/useMenuModalStore";
import useMapLayerStore from "@/store/useMapLayerStore";
import useUserLocationStore from "@/store/useUserLocationStore";

// Custom Components
import MapHeader from "@/components/indexPage/MapHeader";
import NearbyTrucks from "@/components/indexPage/NearbyTrucks";
import SelectedTruck from "@/components/indexPage/SelectedTruck";
import CategoryModal from "@/components/modals/CategoryModal";
import MenuModal from "@/components/modals/MenuModal";
import TruckModal from "@/components/modals/TruckModal";

// Constants, Utilities, Assets
import { ms, ScaledSheet } from "react-native-size-matters";
import { Coordinates, Trucks } from "@/types";
import { featureCollection, point } from "@turf/helpers";
import icon from "@/assets/images/icon.png";
import theme from "@/assets/theme";

// Convex & Custom Hooks
import { useTrucksInViewport } from "@/hooks/useTrucksInViewport";
import { Id } from "@/convex/_generated/dataModel";
import calculateDistance from "@/utils/calculateDistance";

// Mapbox Access Token
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY ?? "");

export default function Index() {
    console.log("\n\napp/(public)/index.tsx: Entered Page");

    /** -------------------------- Local State -------------------------- */

    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [viewportBounds, setViewportBounds] = useState<{
        topLat: number;
        bottomLat: number;
        leftLng: number;
        rightLng: number;
    } | null>(null);

    /** ------------------------ Zustand Stores ------------------------- */

    const { userLocation, fetchUserLocation } = useUserLocationStore();
    const {
        selectedTruck,
        showTruckModal,
        persistedTrucks,
        setPersistedTrucks,
        setSelectedTruckId,
        clearSelectedTruck,
    } = useTruckStore();
    const { categoryFilters, showCategoryModal } = useFilterStore();
    const { showMenuModal } = useMenuModalStore();
    const { mapStyle } = useMapLayerStore();

    /** ---------------------- Refs & Debouncing ------------------------ */

    const cameraRef = useRef<Camera>(null);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    /** ---------------------- Trucks in Viewport ------------------------ */

    const trucksInView: Trucks[] | undefined =
        useTrucksInViewport(viewportBounds);

    /** -------------------------- Callbacks ---------------------------- */

    const moveCamera = useCallback(
        (longitude: number, latitude: number, zoomLevel: number = 14) => {
            console.log("app/(public)/index.tsx: FUNCTION moveCamera CALLED");
            cameraRef.current?.setCamera({
                centerCoordinate: [longitude, latitude],
                zoomLevel,
                animationDuration: 500,
            });
        },
        []
    );

    const handleSearch = useCallback(
        ({ latitude, longitude }: Coordinates) => {
            console.log("app/(public)/index.tsx: FUNCTION handleSearch CALLED");
            moveCamera(longitude, latitude);
            clearSelectedTruck();
        },
        [moveCamera, clearSelectedTruck]
    );

    const handleMapRegionChange = useCallback((data: any) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            console.log(
                "app/(public)/index.tsx: FUNCTION handleMapRegionChange CALLED"
            );
            const visibleBounds = data?.properties?.bounds;
            if (visibleBounds) {
                const topRight = visibleBounds.ne;
                const bottomLeft = visibleBounds.sw;
                const [rightLng, topLat] = topRight;
                const [leftLng, bottomLat] = bottomLeft;

                console.log("Updating bounds:", {
                    topLat,
                    bottomLat,
                    leftLng,
                    rightLng,
                });
                setViewportBounds({ topLat, bottomLat, leftLng, rightLng });
            }
        }, 1000);
    }, []);

    /** -------------------------- Effects ------------------------------- */

    useEffect(() => {
        if (mapLoaded) {
            console.log(
                "app/(public)/index.tsx: MAP LOADED, FETCHING USER LOCATION"
            );
            fetchUserLocation();
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (userLocation) {
            console.log(
                "app/(public)/index.tsx: USER LOCATION FOUND, MOVING CAMERA"
            );
            moveCamera(userLocation.longitude, userLocation.latitude);
            setTimeout(() => setShowMap(true), 300);
        }
    }, [userLocation]);

    useEffect(() => {
        if (selectedTruck?.longitude && selectedTruck.latitude && mapLoaded) {
            moveCamera(
                selectedTruck.longitude,
                selectedTruck.latitude - ms(0.0007),
                16
            );
        } else {
            cameraRef.current?.zoomTo(14, 500);
        }
    }, [selectedTruck, moveCamera, mapLoaded]);

    useEffect(() => {
        if (trucksInView && userLocation) {
            const trucksWithDistance = trucksInView.map((truck) => ({
                ...truck,
                distance: calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    truck.latitude!,
                    truck.longitude!
                ),
            }));

            setPersistedTrucks(trucksWithDistance);
        }
    }, [trucksInView, userLocation]);

    /** -------------------------- Computed ----------------------------- */

    const truckFeatures = useMemo(() => {
        const filteredTrucks = categoryFilters.length
            ? persistedTrucks.filter((truck) =>
                  truck.categories?.some((c: string) =>
                      categoryFilters.includes(c)
                  )
              )
            : persistedTrucks;

        return {
            filteredTrucks,
            featureCollection: featureCollection(
                filteredTrucks.map((truck) =>
                    point([truck.longitude!, truck.latitude!], {
                        id: truck._id,
                    })
                )
            ),
        };
    }, [persistedTrucks, categoryFilters]);

    /** -------------------------- Return ------------------------------- */

    return (
        <View style={styles.rootContainer}>
            <MapHeader handleSearch={handleSearch} moveCamera={moveCamera} />

            <MapView
                style={styles.map}
                styleURL={mapStyle}
                onPress={clearSelectedTruck}
                scaleBarEnabled={false}
                logoEnabled={false}
                onCameraChanged={handleMapRegionChange}
                onDidFinishLoadingMap={() => setMapLoaded(true)}
            >
                <Camera ref={cameraRef} />
                <LocationPuck pulsing={locationPuckStyle.pulsing} />

                <ShapeSource
                    id="foodTrucks"
                    cluster
                    shape={truckFeatures.featureCollection}
                    onPress={(e) => {
                        const truckId = e.features?.[0]?.properties
                            ?.id as Id<"trucks">;
                        if (truckId) {
                            console.log("Truck Selected:", truckId); // Optional Debug
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

            {selectedTruck ? null : ( // <SelectedTruck truck={selectedTruck} />
                <NearbyTrucks trucks={truckFeatures.filteredTrucks} />
            )}

            {showCategoryModal && <CategoryModal />}
            {/* {showMenuModal && selectedTruck && (
                <MenuModal truck={selectedTruck} />
            )}
            {showTruckModal && selectedTruck && (
                <TruckModal truck={selectedTruck} />
            )} */}
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

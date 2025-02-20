// ORIGINAL IMPORTS
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "@/components/SearchBar";
import NearbyTrucksCard from "@/components/NearbyTrucksCard";
import { FOOD_TRUCKS } from "@/constants";
import SelectedTruckCard from "@/components/SelectedTruckCard";
import { FoodTruck } from "@/types";
import CategoryModal from "@/components/CategoryModal";
import MenuModal from "@/components/MenuModal";
import TruckPage from "@/components/TruckPage";

// NEW MAPBOX IMPORTS
import Mapbox, {
    Camera,
    LocationPuck,
    MapView,
    Images,
    ShapeSource,
    SymbolLayer,
    CircleLayer,
} from "@rnmapbox/maps";
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

import { featureCollection, point } from "@turf/helpers";
import icon from "@/assets/images/icon.png";

import useTruckStore from "@/store/useTruckStore";

export default function Index() {
    const {
        selectedTruckId,
        selectedTruck,
        setSelectedTruckId,
        clearSelectedTruck,
    } = useTruckStore();

    const [categoryFilters, setCategoryFilters] = useState<string[]>([]); // Category filters

    const [showCategoryModal, setShowCategoryModal] = useState(false); // Category modal state

    const [showMenuModal, setShowMenuModal] = useState(false); // Menu modal state

    const [showTruckPage, setShowTruckPage] = useState(false); // Truck page state

    const [isExpanded, setIsExpanded] = useState(false); // Card state

    const foodTruckData: FoodTruck[] = FOOD_TRUCKS.map((truck) => {
        return {
            ...truck, // Spread the original truck object
            distance: 1.12, // Placeholder distance
        };
    });

    const points = FOOD_TRUCKS.map((truck) =>
        point([truck.coordinates.longitude, truck.coordinates.latitude], {
            id: truck.id,
        })
    );
    const truckFeatures = featureCollection(points);

    const cameraRef = useRef<Camera>(null);

    // useEffect(() => {
    //     if (selectedTruck && cameraRef.current) {
    //         console.log("camera ref exists");
    //         console.log(selectedTruck.coordinates.longitude);
    //         console.log(selectedTruck.coordinates.latitude);
    //         cameraRef.current.flyTo(
    //             [
    //                 selectedTruck.coordinates.longitude,
    //                 selectedTruck.coordinates.latitude,
    //             ],
    //             100
    //         );
    //     } else if (!selectedTruck && cameraRef.current) {
    //         console.log("camera ref exists");
    //         cameraRef.current.setCamera({
    //             zoomLevel: 12,
    //             animationDuration: 100,
    //         });
    //     } else {
    //         console.log("camera ref does not exist");
    //     }
    // }, [selectedTruck]); // Depend on the selected truck object

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
            {showMenuModal && (
                <MenuModal
                    closeMenu={() => setShowMenuModal(false)}
                    truck={
                        foodTruckData.find(
                            (truck) => truck.id === selectedTruckId
                        )!
                    }
                />
            )}

            {/* Truck Page */}
            {showTruckPage && (
                <TruckPage
                    closeTruckPage={() => setShowTruckPage(false)}
                    truck={
                        foodTruckData.find(
                            (truck) => truck.id === selectedTruckId
                        )!
                    }
                />
            )}

            {/* Search Bar */}
            <SearchBar onSearch={() => {}} />

            {/* Map */}
            <MapView
                style={styles.map}
                styleURL={Mapbox.StyleURL.Street}
                onPress={() => clearSelectedTruck()}
            >
                <Camera
                    ref={cameraRef}
                    followUserLocation={true}
                    followZoomLevel={14}
                    animationMode="flyTo"
                />
                <LocationPuck puckBearingEnabled={true} />

                <ShapeSource
                    id="foodTrucks"
                    cluster
                    shape={truckFeatures}
                    onPress={(e) => {
                        const { features } = e;
                        if (features.length > 0) {
                            const truckId = features[0].properties?.id;
                            setSelectedTruckId(truckId);
                            cameraRef.current?.moveTo([e.coordinates.longitude, e.coordinates.latitude]);
                        }
                    }}
                >
                    <CircleLayer
                        id="clusters"
                        filter={["has", "point_count"]}
                        style={{
                            circlePitchAlignment: "map",
                            circleColor: "orange",
                            circleRadius: 30,
                            circleOpacity: 0.4,
                            circleStrokeWidth: 2,
                            circleStrokeColor: "orange",
                        }}
                    />

                    <SymbolLayer
                        id="clusters-count"
                        style={{
                            textField: ["get", "point_count"],
                            textColor: "white",
                            textSize: 25,
                        }}
                    />

                    <SymbolLayer
                        id="foodTruckIcons"
                        filter={["!", ["has", "point_count"]]}
                        style={{
                            iconImage: "icon",
                            iconSize: 0.05,
                        }}
                    />
                    <Images images={{ icon }} />
                </ShapeSource>
            </MapView>

            {/* Conditional Card Rendering */}
            {selectedTruckId ? (
                <SelectedTruckCard
                    truck={
                        foodTruckData.find(
                            (truck) => truck.id === selectedTruckId
                        )!
                    }
                    openMenu={() => setShowMenuModal(true)}
                    openTruckPage={() => setShowTruckPage(true)}
                />
            ) : (
                /* Make The Truck Cards in the list pressable
                 We most likely will need to redo the handleMarkerPress logic
                 We might need to create a context instead for the selected
                 and then run a function through useEffect whenever the selected
                 truck changes 
                 */
                <NearbyTrucksCard
                    isCategoryActive={categoryFilters.length > 0}
                    isExpanded={isExpanded}
                    onToggleExpand={() => setIsExpanded(!isExpanded)}
                    trucks={foodTruckData.filter(
                        (truck) =>
                            categoryFilters.length === 0 || // If no filters are applied, include all trucks
                            truck.categories.some((category) =>
                                categoryFilters.includes(category)
                            )
                    )}
                    showCategories={() => setShowCategoryModal(true)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    markerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    markerImage: {
        width: 40, // Default width
        height: 40, // Default height
        resizeMode: "contain",
    },
});

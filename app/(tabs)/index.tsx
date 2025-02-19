// ORIGINAL IMPORTS
import React, { useState } from "react";
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
import Mapbox, { Camera, LocationPuck, MapView, Images, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

import { featureCollection, point } from "@turf/helpers";
import icon from "@/assets/images/icon.png";


export default function Index() {
    const [region, setRegion] = useState({
        latitude: 40.76779159578361, // Default to NYC
        longitude: -73.98228109243095,
        latitudeDelta: 0.04, // Adjust for 5-mile radius
        longitudeDelta: 0.02,
    });

    const [categoryFilters, setCategoryFilters] = useState<string[]>([]); // Category filters

    const [showCategoryModal, setShowCategoryModal] = useState(false); // Category modal state

    const [showMenuModal, setShowMenuModal] = useState(false); // Menu modal state

    const [showTruckPage, setShowTruckPage] = useState(false); // Truck page state

    const [isExpanded, setIsExpanded] = useState(false); // Card state

    const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null); // Track the selected truck

    const foodTruckData: FoodTruck[] = FOOD_TRUCKS.map((truck) => {
        return {
            ...truck, // Spread the original truck object
            distance: 1.12, // Placeholder distance
        };
    });

    const points = FOOD_TRUCKS.map((truck)=> point([truck.coordinates.longitude, truck.coordinates.latitude]));
    const truckFeatures = featureCollection(points);

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
            <MapView style={styles.map} styleURL={Mapbox.StyleURL.Street}>
                <Camera followUserLocation={true} followZoomLevel={14} />
                <LocationPuck puckBearingEnabled={true} />

                <ShapeSource id="foodTrucks" shape={truckFeatures}>
                    <SymbolLayer 
                        id="foodTruckIcons"
                        style={{
                            iconImage: 'icon',
                            iconSize: 0.05
                        }} 
                    />
                    <Images images={{icon}} />

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

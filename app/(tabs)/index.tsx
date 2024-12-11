import React, { useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Animated,
    Pressable,
    FlatList,
    Text,
    Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import SearchBar from "@/components/SearchBar";
import NearbyTrucksCard from "@/components/NearbyTrucksCard";
import { FOOD_TRUCKS, CATEGORIES } from "@/constants";
import SelectedTruckCard from "@/components/SelectedTruckCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import theme from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getDistance } from "geolib";
import { FoodTruck } from "@/types";

export default function Index() {
    const [region, setRegion] = useState({
        latitude: 40.76779159578361, // Default to NYC
        longitude: -73.98228109243095,
        latitudeDelta: 0.04, // Adjust for 5-mile radius
        longitudeDelta: 0.02,
    });

    const [mapType, setMapType] = useState<
        "standard" | "hybrid" | "mutedStandard"
    >("mutedStandard"); // Map type

    const [categoryFilters, setCategoryFilters] = useState<string[]>([]); // Category filters

    const [showCategoryModal, setShowCategoryModal] = useState(false); // Category modal state

    const [isExpanded, setIsExpanded] = useState(false); // Card state

    const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null); // Track the selected truck

    const foodTruckData: FoodTruck[] = FOOD_TRUCKS.map((truck) => {
        return {
            ...truck, // Spread the original truck object
            distance:getDistance(truck.coordinates, {
                    latitude: 40.7698499519505,
                    longitude: -73.98251936106666,
                }) / 1609.344, // Add the calculated distance
        };
    });

    const mapRef = useRef<MapView>(null); // Ref for the MapView

    const animationValues = useRef(
        foodTruckData.reduce((acc, truck) => {
            acc[truck.id] = new Animated.Value(1); // Initialize each truck with a default scale of 1
            return acc;
        }, {} as Record<string, Animated.Value>)
    ).current; // Animated values for icon sizes

    const handleMarkerPress = (truck: any) => {
        if (selectedTruckId === truck.id) {
            // If already selected, zoom out and deselect
            mapRef.current?.animateToRegion(
                {
                    latitude: 40.76779159578361,
                    longitude: -73.98228109243095,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.02,
                },
                650
            );
            setSelectedTruckId(null);

            // Shrink the icon back
            Animated.timing(animationValues[truck.id], {
                toValue: 1,
                duration: 650,
                useNativeDriver: true,
            }).start();
        } else {
            // Zoom into the selected truck
            if (selectedTruckId) {
                // Reset the previously selected truck
                Animated.timing(animationValues[selectedTruckId], {
                    toValue: 1,
                    duration: 650,
                    useNativeDriver: true,
                }).start();
            }

            mapRef.current?.animateToRegion(
                {
                    latitude: truck.coordinates.latitude - 0.003,
                    longitude: truck.coordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                650
            );
            setSelectedTruckId(truck.id);

            // Enlarge the icon for the newly selected truck
            Animated.timing(animationValues[truck.id], {
                toValue: 1.8,
                duration: 650,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleSearch = (location: {
        latitude: number;
        longitude: number;
    }) => {
        mapRef.current?.animateToRegion(
            {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            650
        );
    };

    const userLocation = () => {
        mapRef.current?.animateToRegion(
            {
                latitude: 40.7698499519505,
                longitude: -73.98251936106666,
                latitudeDelta: 0.04,
                longitudeDelta: 0.02,
            },
            650
        );
    };

    return (
        <View style={styles.container}>
            {/* Category Modal */}
            {showCategoryModal && (
                <View style={styles.categoryModal}>
                    <View style={styles.categoryHeader}>
                        {/* Gradient Background */}
                        <LinearGradient
                            colors={[
                                "rgba(255, 132, 0, 0.9)",
                                "rgba(255, 132, 0, 0)",
                            ]}
                            // locations={[0.2, 0.8]}
                            style={styles.gradient}
                        />
                        <Pressable
                            style={styles.backBtnContainer}
                            onPress={() => setShowCategoryModal(false)}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={30}
                                color={theme.colors.white}
                            />
                        </Pressable>
                    </View>

                    <View style={styles.categoryTitleBar}>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: "bold",
                                color: theme.colors.primary,
                            }}
                        >
                            Select Categories
                        </Text>
                        <Pressable
                            style={{ paddingHorizontal: 15 }}
                            onPress={() => setCategoryFilters([])}
                        >
                            <Text
                                style={{
                                    color: theme.colors.primary,
                                    fontSize: 16,
                                }}
                            >
                                Clear All
                            </Text>
                        </Pressable>
                    </View>

                    <FlatList
                        style={styles.categoryListView}
                        columnWrapperStyle={styles.columnWrapper} // Add gap between columns
                        data={CATEGORIES}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <Pressable
                                style={[
                                    styles.categoryButton,
                                    categoryFilters.includes(item.name)
                                        ? styles.categorySelected
                                        : {},
                                ]}
                                onPress={() => {
                                    if (categoryFilters.includes(item.name)) {
                                        setCategoryFilters(
                                            categoryFilters.filter(
                                                (name) => name !== item.name
                                            )
                                        );
                                    } else {
                                        setCategoryFilters([
                                            ...categoryFilters,
                                            item.name,
                                        ]);
                                    }
                                }}
                            >
                                <Image
                                    source={{ uri: item.url }}
                                    style={styles.image}
                                />
                                <Text>{item.name}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            )}

            {/* Search Bar */}
            <SearchBar
                onSearch={handleSearch}
                onLocate={userLocation}
                currentMap={mapType}
                changeMapToSatellite={() => setMapType("hybrid")}
                changeMapToDetailed={() => setMapType("standard")}
                changeMapToRegular={() => setMapType("mutedStandard")}
            />

            {/* Map */}
            <MapView
                ref={mapRef} // Attach ref to MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                loadingEnabled={true}
                loadingBackgroundColor={theme.colors.white}
                loadingIndicatorColor={theme.colors.primary}
                showsCompass={false}
                mapType={mapType}
            >
                <Marker
                    coordinate={{
                        latitude: 40.7698499519505,
                        longitude: -73.98251936106666,
                    }}
                >
                    {/* Custom Marker View */}
                    <View
                        style={{
                            backgroundColor: theme.colors.primary,
                            padding: 2,
                            borderRadius: 30,
                        }}
                    >
                        <MaterialIcons
                            name="person-pin-circle"
                            size={40}
                            color="white"
                        />
                    </View>
                </Marker>
                {foodTruckData
                    .filter(
                        (truck) =>
                            categoryFilters.length === 0 || // If no filters are applied, include all trucks
                            truck.categories.some((category) =>
                                categoryFilters.includes(category)
                            )
                    )
                    .map((truck) => (
                        <Marker
                            key={truck.id}
                            coordinate={{
                                latitude: truck.coordinates.latitude,
                                longitude: truck.coordinates.longitude,
                            }}
                            onPress={() => handleMarkerPress(truck)} // Handle press
                        >
                            {/* Custom Marker View */}
                            <View style={styles.markerContainer}>
                                <Animated.Image
                                    source={require("@/assets/images/icon.png")}
                                    style={[
                                        styles.markerImage,
                                        {
                                            transform: [
                                                {
                                                    scale: animationValues[
                                                        truck.id
                                                    ],
                                                },
                                            ],
                                        },
                                    ]}
                                />
                            </View>
                        </Marker>
                    ))}
            </MapView>

            {/* Conditional Card Rendering */}
            {selectedTruckId ? (
                <SelectedTruckCard
                    truck={
                        foodTruckData.find(
                            (truck) => truck.id === selectedTruckId
                        )!
                    }
                    backFunction={() =>
                        handleMarkerPress(
                            foodTruckData.find(
                                (truck) => truck.id === selectedTruckId
                            )!
                        )
                    }
                    nextTruck={() => {
                        const num = parseInt(selectedTruckId, 10);
                        if (num === 10) {
                            handleMarkerPress(
                                foodTruckData.find((truck) => truck.id === "1")!
                            );
                        } else {
                            handleMarkerPress(
                                foodTruckData.find(
                                    (truck) => truck.id === (num + 1).toString()
                                )!
                            );
                        }
                    }}
                    previousTruck={() => {
                        const num = parseInt(selectedTruckId, 10);
                        if (num === 1) {
                            handleMarkerPress(
                                foodTruckData.find(
                                    (truck) => truck.id === "10"
                                )!
                            );
                        } else {
                            handleMarkerPress(
                                foodTruckData.find(
                                    (truck) => truck.id === (num - 1).toString()
                                )!
                            );
                        }
                    }}
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
    categoryModal: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.white,
        zIndex: 100,
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 80,
        paddingBottom: 30,
    },
    backBtnContainer: {
        padding: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    categoryTitleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingVertical: 20,
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    categoryListView: {
        flex: 1,
        marginHorizontal: 10,
    },
    columnWrapper: {
        justifyContent: "space-between", // Space between columns
    },
    categoryButton: {
        width: 120,
        height: 120,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        gap: 5,
        backgroundColor: theme.colors.primarySuperLight,
    },
    image: {
        width: 50,
        height: 50,
    },
    categorySelected: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
    },
});

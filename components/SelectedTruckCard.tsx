import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import theme from "@/theme/theme";
import { FoodTruck } from "@/types";

import useTruckStore from "@/store/useTruckStore";
import useMenuModalStore from "@/store/useMenuModalStore";

interface SelectedTruckCardProps {
    truck: FoodTruck;
}

const SelectedTruckCard: React.FC<SelectedTruckCardProps> = ({ truck }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const { clearSelectedTruck, nextTruck, previousTruck, toggleTruckPage } =
        useTruckStore();
    const { toggleMenuModal } = useMenuModalStore();

    // Memoized function for toggling favorite state
    const handleToggleFavorite = useCallback(() => {
        setIsFavorite((prev) => !prev);
    }, []);

    // Calculate estimated driving & walking time once
    const estimatedDriveTime = Math.round(truck.distance * 3);
    const estimatedWalkTime = Math.round(truck.distance * 20);

    return (
        <BlurView intensity={10} style={styles.cardContainer}>
            {/* Title Bar */}
            <View style={styles.titleBar}>
                <Pressable style={styles.backButtonContainer} onPress={clearSelectedTruck}>
                    <Ionicons name="arrow-back" size={30} color={theme.colors.white} />
                </Pressable>

                <Text style={styles.title}>{truck.name}</Text>

                <View style={[styles.openCloseContainer, truck.isOpen ? styles.open : styles.closed]}>
                    <Text style={styles.openCloseText}>{truck.isOpen ? "Open" : "Closed"}</Text>
                </View>

                <Pressable style={styles.bookmarkIcon} onPress={handleToggleFavorite}>
                    <Ionicons
                        name={isFavorite ? "bookmark" : "bookmark-outline"}
                        size={25}
                        color={theme.colors.primary}
                    />
                </Pressable>
            </View>

            {/* Truck Info */}
            <View style={styles.infoSection}>
                <Text style={styles.bolded}>
                    {`${truck.distance.toFixed(2)} mi ⦁ ${estimatedDriveTime} min drive ⦁ ${estimatedWalkTime} min walk`}
                </Text>

                <View style={styles.divider} />
                <Text style={styles.bolded}>{truck.categories.join(", ")}</Text>
                <View style={styles.divider} />

                <Text style={styles.bolded}>Stationary Truck</Text>
                <View style={styles.divider} />

                <View style={styles.vert}>
                    <Text style={styles.bolded}>Hours:</Text>
                    <Text style={styles.detail}>9am - 9pm</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.vert}>
                    <Text style={styles.ratingText}>Ratings</Text>
                    <View style={styles.stars}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Ionicons
                                key={index}
                                name={index < Math.floor(truck.rating) ? "star" : "star-outline"}
                                size={12}
                                color={theme.colors.primary}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Action Buttons */}
                <View style={styles.buttonRow}>
                    <Pressable style={styles.button} onPress={toggleMenuModal}>
                        <MaterialIcons name="restaurant-menu" size={20} color="white" />
                        <Text style={styles.buttonText}>Menu</Text>
                    </Pressable>

                    <Pressable style={styles.button}>
                        <MaterialCommunityIcons name="directions" size={20} color="white" />
                        <Text style={styles.buttonText}>Directions</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={toggleTruckPage}>
                        <MaterialCommunityIcons name="truck-outline" size={20} color="white" />
                        <Text style={styles.buttonText}>View Truck</Text>
                    </Pressable>
                </View>

                <View style={styles.divider} />
            </View>

            {/* Image Gallery */}
            <View style={styles.imageGallery}>
                <FlatList
                    data={truck.images}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Navigation Buttons */}
            <View style={styles.navigationButtons}>
                <Pressable onPress={previousTruck}>
                    <Ionicons name="chevron-back" size={40} color={theme.colors.primary} style={styles.navButton} />
                </Pressable>
                <Pressable onPress={nextTruck}>
                    <Ionicons name="chevron-forward" size={40} color={theme.colors.primary} style={styles.navButton} />
                </Pressable>
            </View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "60%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: "rgba(255, 255, 255, 0.90)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: "hidden",
        flexDirection: "column",
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5,
        marginBottom: 10,
    },
    backButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.primary,
        flex: 1,
    },
    openCloseContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 25,
        borderRadius: 20,
    },
    openCloseText: {
        borderRadius: 15,
        paddingHorizontal: 10,
        fontSize: 12,
        fontWeight: "bold",
        color: theme.colors.white,
    },
    open: {
        backgroundColor: "green",
    },
    closed: {
        backgroundColor: "red",
    },
    bookmarkIcon: {
        paddingRight: 10,
    },
    infoSection: {},
    bolded: {
        fontSize: 12,
        color: theme.colors.black,
        fontWeight: "bold",
    },
    detail: {
        fontSize: 12,
        color: theme.colors.black,
    },
    categoryDistance: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    vert: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 1,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 12,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    stars: {
        flexDirection: "row",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        gap: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    imageGallery: {
        flexDirection: "row",
        marginVertical: 2,
    },
    image: {
        width: 150, // Adjust width for each image
        height: 100, // Adjust height for each image
        borderRadius: 10,
        marginRight: 10, // Add spacing between images
        resizeMode: "cover", // Ensure the image covers the area properly
    },
    navigationButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        
    },
    navButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    divider: {
        height: 1,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        width: "100%",
        marginVertical: 5,
    },
});

export default SelectedTruckCard;

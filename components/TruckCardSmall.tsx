/**
 * @file TruckCardSmall.tsx
 * @description A compact card component displaying essential information about a food truck.
 *
 * Used In:
 * - TruckCardList.tsx
 *
 * Features:
 * - Displays truck name, open/closed status, distance, estimated travel time, and categories.
 * - Shows a star rating and number of reviews.
 * - Includes a favorite (bookmark) button to toggle favorite status.
 * - Uses `React.memo` to prevent unnecessary re-renders in large lists.
 * - Optimized with `useMemo` and `useCallback` to improve performance.
 */

import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from '@/assets/theme';
import { FoodTruck } from "@/types";

interface TruckCardSmallProps {
    truck: FoodTruck; // Data object containing truck information
}

/**
 * @component TruckCardSmall
 * @description A single compact food truck card optimized for performance in large lists.
 */
const TruckCardSmall: React.FC<TruckCardSmallProps> = ({ truck }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    /**
     * Toggles the favorite status of the truck.
     * Memoized with `useCallback` to prevent unnecessary re-creations.
     */
    const toggleFavorite = useCallback(() => {
        setIsFavorite((prev) => !prev);
    }, []);

    /**
     * Generates the star rating icons.
     * Memoized with `useMemo` to avoid recalculations on re-renders.
     */
    const starIcons = useMemo(
        () =>
            Array.from({ length: 5 }, (_, index) => (
                <Ionicons
                    key={index}
                    name={index < Math.floor(truck.rating) ? "star" : "star-outline"}
                    size={16}
                    color={theme.colors.primary}
                />
            )),
        [truck.rating]
    );

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                {/* Truck Image */}
                <Image source={{ uri: truck.imageUrl }} style={styles.image} />

                {/* Truck Info */}
                <View style={styles.infoContainer}>
                    {/* Name and Open/Closed Status */}
                    <Text style={styles.name}>
                        {truck.name} ⦁{" "}
                        <Text style={truck.isOpen ? styles.open : styles.closed}>
                            {truck.isOpen ? "OPEN" : "CLOSED"}
                        </Text>
                    </Text>

                    {/* Distance and Estimated Travel Time */}
                    <Text style={styles.details}>
                        {`${truck.distance.toFixed(2)} mi ⦁ `}
                        {`${Math.round(truck.distance * 3)} min drive ⦁ `}
                        {`${Math.round(truck.distance * 20)} min walk`}
                    </Text>

                    {/* Categories */}
                    <Text style={styles.categories}>{truck.categories.join(", ")}</Text>

                    {/* Star Ratings */}
                    <View style={styles.ratingContainer}>
                        {starIcons}
                        <Text style={styles.ratingText}>{truck.rating}</Text>
                        <Text style={styles.reviewCount}>({truck.reviewCount})</Text>
                    </View>
                </View>

                {/* Favorite (Bookmark) Icon */}
                <Pressable style={styles.bookmarkIcon} onPress={toggleFavorite}>
                    <Ionicons
                        name={isFavorite ? "bookmark" : "bookmark-outline"}
                        size={35}
                        color={theme.colors.primary}
                    />
                </Pressable>
            </View>
            <View style={styles.divider} />
        </View>
    );
};

/**
 * @constant styles
 * @description Styles for the TruckCardSmall component.
 */
const styles = StyleSheet.create({
    outerContainer: {
        gap: 5,
        marginBottom: 5,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
        width: "100%",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        resizeMode: "cover",
    },
    infoContainer: {
        flex: 1,
        flexDirection: "column",
        paddingLeft: 10,
        gap: 2,
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    open: {
        color: "green",
    },
    closed: {
        color: "red",
    },
    details: {
        fontSize: 12,
        color: theme.colors.black,
    },
    categories: {
        fontSize: 12,
        color: theme.colors.black,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 12,
        color: theme.colors.black,
    },
    reviewCount: {
        fontSize: 12,
        color: theme.colors.black,
    },
    bookmarkIcon: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    divider: {
        height: 1,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        width: "100%",
        marginVertical: 5,
    },
});

// Prevents unnecessary re-renders when props haven't changed.
export default React.memo(TruckCardSmall);

/**
 * @file TruckCardSmall.tsx
 * @description A compact card component displaying essential information about a food truck.
 *
 * Features:
 * - Displays truck name, status (open/closed), distance, estimated travel time, and categories.
 * - Shows a star rating and number of reviews.
 * - Includes a favorite (bookmark) button to toggle favorite status.
 * - Optimized for performance and readability.
 */

import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/theme/theme";
import { FoodTruck } from "@/types";

interface TruckCardSmallProps {
    truck: FoodTruck;
}

const TruckCardSmall: React.FC<TruckCardSmallProps> = ({ truck }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Memoized function to handle favorite toggle
    const toggleFavorite = useCallback(() => {
        setIsFavorite((prev) => !prev);
        console.log("Bookmark icon pressed");
    }, []);

    return (
        <View style={styles.container}>
            {/* Truck Image */}
            <Image source={{ uri: truck.imageUrl }} style={styles.image} />

            {/* Truck Info */}
            <View style={styles.infoContainer}>
                {/* Name and Status */}
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
                    {Array.from({ length: 5 }, (_, index) => (
                        <Ionicons
                            key={index}
                            name={index < Math.floor(truck.rating) ? "star" : "star-outline"}
                            size={16}
                            color={theme.colors.primary}
                        />
                    ))}
                    <Text style={styles.ratingText}>{truck.rating}</Text>
                    <Text style={styles.reviewCount}>({truck.reviewCount})</Text>
                </View>
            </View>

            {/* Favorite Icon */}
            <Pressable style={styles.bookmarkIcon} onPress={toggleFavorite}>
                <Ionicons
                    name={isFavorite ? "bookmark" : "bookmark-outline"}
                    size={35}
                    color={theme.colors.primary}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default TruckCardSmall;

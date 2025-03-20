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
import { View, Text, Image, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/assets/theme";
import { FoodTruck } from "@/types";
import { ms, ScaledSheet } from "react-native-size-matters";

const { width } = Dimensions.get("window");

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
                    name={
                        index < Math.floor(truck.rating)
                            ? "star"
                            : "star-outline"
                    }
                    size={ms(12)}
                    color={theme.colors.primary}
                />
            )),
        [truck.rating]
    );

    return (
        /*
            The root container holds the body and then a divider
            root {
              body row
              divider
            }
        */
        <View style={styles.rootContainer}>
            <View style={styles.bodyContainer}>
                {/* Truck Image */}
                <Image source={{ uri: truck.imageUrl }} style={styles.image} />

                {/* Truck Info */}
                <View style={styles.infoContainer}>
                    {/* Name and Open/Closed Status */}
                    <Text style={styles.name}>
                        {truck.name} ⦁{" "}
                        <Text
                            style={truck.isOpen ? styles.open : styles.closed}
                        >
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
                    <Text style={styles.details}>
                        {truck.categories.join(", ")}
                    </Text>

                    {/* Star Ratings */}
                    <View style={styles.ratingContainer}>
                        {starIcons}
                        <Text style={styles.ratingText}>{truck.rating}</Text>
                        <Text style={styles.ratingText}>
                            ({truck.reviewCount})
                        </Text>
                    </View>
                </View>

                {/* Favorite (Bookmark) Icon */}
                <Pressable style={styles.bookmarkIcon} onPress={toggleFavorite}>
                    <Ionicons
                        name={isFavorite ? "bookmark" : "bookmark-outline"}
                        size={ms(30)}
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
const styles = ScaledSheet.create({
    rootContainer: {
        gap: 5,
        marginBottom: 5,
    },
    bodyContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms",
    },
    image: {
        width: width * .18,
        height: width * .18,
        borderRadius: "8@ms",
        resizeMode: "cover",
    },
    infoContainer: {
        flex: 1,
        gap: "1@ms",
    },
    name: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
        fontWeight: "bold",
    },
    open: {
        color: theme.colors.green,
    },
    closed: {
        color: theme.colors.red,
    },
    details: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.black,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: "2@ms",
    },
    ratingText: {
        fontWeight: "medium",
        fontSize: theme.fontSize.xs,
        color: theme.colors.primary,
    },
    bookmarkIcon: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: theme.padding.sm,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.gray,
        width: "100%",
        marginVertical: 5,
    },
});

// Prevents unnecessary re-renders when props haven't changed.
export default React.memo(TruckCardSmall);

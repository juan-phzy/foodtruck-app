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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "@/assets/theme";
import { Trucks } from "@/types";
import { ms, ScaledSheet } from "react-native-size-matters";
import useTruckStore from "@/store/useTruckStore";

const { width } = Dimensions.get("window");

interface TruckCardSmallProps {
    truck: Trucks; // Data object containing truck information
    pressable: boolean; // Determines if the card is pressable
}

/**
 * @component TruckCardSmall
 * @description A single compact food truck card optimized for performance in large lists.
 */
const TruckCardSmall: React.FC<TruckCardSmallProps> = ({
    truck,
    pressable,
}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const { setSelectedTruckId } = useTruckStore();

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
                <MaterialCommunityIcons
                    key={index}
                    name={
                        index < Math.floor(truck.rating!)
                            ? "star"
                            : "star-outline"
                    }
                    size={ms(12)}
                    color={theme.colors.primary}
                />
            )),
        [truck.rating]
    );

    const handlePress = () => {
        if (pressable) {
            setSelectedTruckId(truck._id);
        }
    };

    return (
        /*
            The root container holds the body and then a divider
            root {
              body row
              divider
            }
        */
        <Pressable onPress={handlePress} style={styles.rootContainer}>
            <View style={styles.bodyContainer}>
                {/* Truck Image */}
                <Image
                    source={require("@/assets/images/placeholder.jpg")}
                    style={styles.image}
                />

                {/* Truck Info */}
                <View style={styles.infoContainer}>
                    {/* Name and Open/Closed Status */}
                    <Text style={styles.name}>
                        {truck.truck_name} ⦁{" "}
                        <Text
                            style={truck.open_status ? styles.open : styles.closed}
                        >
                            {truck.open_status ? "OPEN" : "CLOSED"}
                        </Text>
                    </Text>

                    {/* Distance and Estimated Travel Time */}
                    <Text style={styles.details}>
                        {`${truck.distance!.toFixed(2)} mi ⦁ `}
                        {`${Math.round(truck.distance! * 3)} min drive ⦁ `}
                        {`${Math.round(truck.distance! * 20)} min walk`}
                    </Text>

                    {/* Categories */}
                    <Text style={styles.details}>
                        {truck.categories!.join(", ")}
                    </Text>

                    {/* Star Ratings */}
                    <View style={styles.ratingContainer}>
                        {starIcons}
                        <Text style={styles.ratingText}>{truck.rating}</Text>
                        <Text style={styles.ratingText}>
                          {`(0)`} {/* FIX Put Review Count In Later */}
                        </Text>
                    </View>
                </View>

                {/* Favorite (Bookmark) Icon */}
                <Pressable style={styles.bookmarkIcon} onPress={toggleFavorite}>
                    <MaterialCommunityIcons
                        name={isFavorite ? "bookmark" : "bookmark-outline"}
                        size={ms(30)}
                        color={theme.colors.primary}
                    />
                </Pressable>
            </View>
            <View style={styles.divider} />
        </Pressable>
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
        width: width * 0.18,
        height: width * 0.18,
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

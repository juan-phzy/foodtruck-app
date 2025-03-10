import React, { useMemo } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/theme/theme";
import { FoodTruck } from "@/types";

interface SearchTruckCardProps {
    truck: FoodTruck; // Data object containing truck information
}

const SearchTruckCard: React.FC<SearchTruckCardProps> = ({ truck }) => {

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
        <Pressable style = {styles.wholeContainer}>
            <View style = {styles.imageContainer}>
                <Image source={{ uri: truck.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.otherContainer}>
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
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    wholeContainer:{
        borderWidth: 0.2,
        borderColor: "black",
        borderRadius: 10
    },
    imageContainer:{
        flex:1,
        flexDirection:"row",
        width:"100%"
    },
    image: {
        width: 195,
        height: 100,
        borderTopLeftRadius: 8,
        borderTopRightRadius:8,
        resizeMode: "cover",
    },
    otherContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "transparent",
        width: "100%",
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

// Prevents unnecessary re-renders when props haven't changed.
export default SearchTruckCard;
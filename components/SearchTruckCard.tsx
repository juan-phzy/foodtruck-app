
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
                    size={12}
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
            {/*Keep the info flexed row, while the inner info is flexed column */}
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
                    {/* Categories list */}
                    <Text style={styles.categories}>{truck.categories.join(", ")}</Text>
                    
                    {/* Distance and star icons */}
                    <View>
                        <Text style={styles.details}>
                            {`${truck.distance.toFixed(2)} mi ⦁ `}
                            {starIcons}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    wholeContainer: {
        width: 250,
        height: 190,
        borderWidth: 0.1,
        borderColor: "black",
        borderRadius: 10,
        backgroundColor: theme.colors.primarySuperLight,
    },
    imageContainer: {
        width: "100%",
    },
    image: {
        width: 250,
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        resizeMode: "cover",
    },
    otherContainer: {
        flex: 1, 
        flexDirection: "row",
    },
    infoContainer: {
        alignItems: "flex-start",
        width: "100%",
        flex: 1,
        flexDirection: "column",
        paddingLeft: 10,
        paddingTop: 2, 
        gap: 3,
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
    categories: {
        flexDirection: "row",
        fontSize: 12,
        color: theme.colors.black,
    },
    details: {
        fontSize: 12,
        color: theme.colors.black,
    },
});

export default SearchTruckCard;

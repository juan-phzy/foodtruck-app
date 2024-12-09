import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/theme/theme";
import { FoodTruck } from "@/types";

interface TruckCardSmallProps {
    truck: FoodTruck;
}

const TruckCardSmall: React.FC<TruckCardSmallProps> = ({ truck }) => {
    //temporary state for favorite icon, should be extracted from user data
    const [isFavorite, setIsFavorite] = useState(false);



    return (
        <View style={styles.container}>
            {/* Truck Image */}
            <Image
                source={{uri: truck.imageUrl}}
                style={styles.image}
            />

            {/* Truck Info */}
            <View style={styles.infoContainer}>
                {/* Name and Status */}
                <Text style={styles.name}>
                    {truck.name} ⦁{" "}
                    <Text style={truck.isOpen ? styles.open : styles.closed}>
                        {truck.isOpen ? "OPEN" : "CLOSED"}
                    </Text>
                </Text>

                {/* Distance and Time */}
                <Text style={styles.details}>
                    2 mi away ⦁ 5 min drive ⦁ 15 min walk
                </Text>

                {/* Description / Categories */}
                <Text style={styles.categories}>{truck.description}</Text>

                {/* Star Ratings */}
                <View style={styles.ratingContainer}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <Ionicons
                            key={index}
                            name={
                                index < Math.floor(truck.rating)
                                    ? "star"
                                    : "star-outline"
                            }
                            size={16}
                            color={theme.colors.primary}
                        />
                    ))}
                    <Text style={{marginLeft:5, fontSize:12}}>{truck.rating}</Text>
                    <Text style={{fontSize:12}}>({truck.reviewCount})</Text>
                </View>
            </View>

            {/* Favorite Icon */}
            <Pressable
                style={styles.bookmarkIcon}
                onPress={() => {
                    setIsFavorite(!isFavorite);
                    console.log("Bookmark icon pressed");
                }}
            >
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
        borderColor: "red",
        borderWidth: 0,
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
    bookmarkIcon: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
});

export default TruckCardSmall;

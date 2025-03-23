import { View, Text, Image, Dimensions } from "react-native";
import React, { useMemo } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { Ionicons } from "@expo/vector-icons";
import { FoodTruck } from "@/types";

const { width } = Dimensions.get("window");

interface TruckCardProps {
    readonly truck: FoodTruck;
}

export default function TruckCard({truck}: TruckCardProps) {

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
                    size={ms(10)}
                    color={theme.colors.primary}
                />
            )),
        [truck.rating]
    );

    return (
        <View style={styles.rootContainer}>
            <Image
                style={styles.image}
                source={{ uri: truck.imageUrl }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {truck.name}
                    {` ⦁ `}
                    <Text
                        style={truck.isOpen ? styles.open : styles.closed}
                    >
                        {truck.isOpen ? "OPEN" : "CLOSED"}
                    </Text>
                </Text>
                <Text style={styles.text}>
                    {truck.categories.join(", ")}
                </Text>
                <Text style={styles.text}>
                    {starIcons}
                    {` ⦁ `}
                    {truck.distance.toFixed(2)} mi away
                </Text>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        width: width * 0.6,
        overflow: "hidden",
        borderRadius: "20@ms",
        backgroundColor: theme.colors.primaryLight,
        borderColor: theme.colors.grayLight,
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: width * 0.3,
        resizeMode: "cover",
    },
    textContainer: {
        padding: theme.padding.xs,
    },
    title: {
        fontSize: theme.fontSize.sm,
        fontWeight: "bold",
        marginBottom: theme.padding.xxs,
    },
    open: {
        color: theme.colors.greenLight,
    },
    closed: {
        color: theme.colors.red,
    },
    text: {
        fontSize: theme.fontSize.xs,
    },
});

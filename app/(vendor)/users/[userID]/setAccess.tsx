import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import theme from "@/assets/theme";
import { router, useSegments } from "expo-router";

const trucksList = [
    { id: 1, name: "Truck 1" },
    { id: 2, name: "Truck 2" },
    { id: 3, name: "Truck 3" },
    { id: 4, name: "Truck 4" },
    { id: 5, name: "Truck 5" },
    { id: 6, name: "Truck 6" },
];

export default function SetAccess() {
    const [access, setAccess] = useState<number[]>([1, 2, 3, 6]);
    const insets = useSafeAreaInsets();

    const segment = useSegments();
    console.log("Segment: ", segment);
    console.log("User ID: ", segment[2]);

    const toggleAccess = (id: number) => {
        setAccess((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <View style={styles.rootContainer}>
            {/* Top Section containing Header and Card */}
            <View style={styles.topSection}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.goBack}
                        onPress={() => router.back()}
                    >
                        <View style={styles.arrowButton}>
                            <Ionicons
                                name="arrow-back"
                                size={theme.fontSize.xxl}
                                color={theme.colors.white}
                            />
                        </View>
                        <Text style={styles.goBackText}>Go Back</Text>
                    </TouchableOpacity>
                </View>

                {/* User Info */}
                <View style={styles.cardContainer}>
                    <FontAwesome name="user" style={styles.userIcon} />
                    <Text style={styles.nameText}>Employee 1 Access</Text>
                </View>
            </View>

            {/* Truck Access List */}
            <FlatList
                data={trucksList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => toggleAccess(item.id)}
                    >
                        <Text style={styles.label}>{item.name}</Text>
                        <Ionicons
                            name={
                                access.includes(item.id)
                                    ? "checkmark-circle"
                                    : "ellipse-outline"
                            }
                            size={theme.fontSize.xxl}
                            color={theme.colors.primary}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.padding.xl,
        //borderColor: "red",
        //borderWidth: 2,
    },
    topSection: {
        gap: "10@ms",
        paddingTop: theme.padding.xxxxl,
        //borderColor: "blue",
        //borderWidth: 1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms",
        //borderColor: "purple",
        //borderWidth: 2,
    },
    goBack: {
        flexDirection: "row",
        gap: "10@ms",
        alignItems: "center",
        //borderColor: "red",
        //borderWidth: 1,
    },
    arrowButton: {
        borderRadius: "20@ms",
        width: "35@ms",
        height: "35@ms",
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
        //borderColor: "black",
        //borderWidth: 1,
    },
    goBackText: {
        fontSize: theme.fontSize.lg,
        //borderColor: "black",
        //borderWidth: 1,
    },
    cardContainer: {
        alignItems: "center",
        //borderColor: "black",
        //borderWidth: 1,
    },
    userIcon: {
        fontSize: "100@ms",
        color: theme.colors.primary,
        //borderColor: "red",
        //borderWidth: 1,
    },
    nameText: {
        fontSize: theme.fontSize.xxl,
        fontWeight: "bold",
        //borderColor: "red",
        //borderWidth: 1,
    },
    row: {
        height: "54@ms",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.grayLight,
        paddingVertical: theme.padding.sm,
        //borderColor: "red",
        //borderWidth: 1,
    },
    label: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
        fontWeight: "bold",
        //borderColor: "black",
        //borderWidth: 1,
    },
});

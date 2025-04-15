import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "@/assets/theme";
import { router, useLocalSearchParams, useSegments } from "expo-router";

export default function ManageUserScreen() {
    const { userID } = useLocalSearchParams();

    const [isAdmin, setIsAdmin] = useState(true);

    const segment = useSegments();
    console.log("Segment: ", segment);
    console.log("User ID: ", userID);

    return (
        <View style={styles.rootContainer}>
            {/* Top Section (Header + User Info Card) */}
            <View style={styles.topSection}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.goBack}
                        onPress={router.back}
                    >
                        <View style={styles.arrowButton}>
                            <MaterialCommunityIcons
                                name="arrow-left"
                                size={theme.fontSize.xxl}
                                color={theme.colors.white}
                            />
                        </View>
                        <Text style={styles.goBackText}>Go Back</Text>
                    </TouchableOpacity>
                </View>

                {/* User Info Card */}
                <View style={styles.cardContainer}>
                    <MaterialCommunityIcons name="account-circle" style={styles.userIcon} />
                    <Text style={styles.nameText}>{userID}</Text>
                </View>
            </View>

            {/* Details Rows */}
            <View>
                <UserDetailRow
                    label="Set Admin Status"
                    type="toggle"
                    value={isAdmin}
                    onToggle={() => setIsAdmin(!isAdmin)}
                />
                <UserDetailRow label="Email" value="employee1@gmail.com" />
                <UserDetailRow label="Phone" value="(973)-123-1234" />
                <UserDetailRow label="Set Truck Access" type="arrow" />
            </View>
        </View>
    );
}

function UserDetailRow({
    label,
    value,
    type,
    onToggle,
}: Readonly<{
    label: string;
    value?: string | boolean;
    type?: "toggle" | "arrow";
    onToggle?: () => void;
}>) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            {(() => {
                if (type === "toggle") {
                    return (
                        <View style={styles.toggleContainer}>
                            <Text style={styles.toggleLabel}>
                                {value ? "On" : "Off"}
                            </Text>
                            <Switch
                                value={!!value}
                                onValueChange={onToggle}
                                thumbColor={theme.colors.white}
                                trackColor={{
                                    false: theme.colors.grayLight,
                                    true: theme.colors.primary,
                                }}
                            />
                        </View>
                    );
                } else if (type === "arrow") {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                router.push(`/users/${value}/setAccess`);
                            }}
                        >
                            <MaterialCommunityIcons
                                name="menu-right"
                                size={theme.fontSize.xxl}
                                color={theme.colors.black}
                            />
                        </TouchableOpacity>
                    );
                } else {
                    return <Text style={styles.value}>{value}</Text>;
                }
            })()}
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
    value: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.grayDark,
        //borderColor: "black",
        //borderWidth: 1,
    },
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        //borderColor: "black",
        //borderWidth: 1,
    },
    toggleLabel: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
        //borderColor: "black",
        //borderWidth: 1,
    },
});

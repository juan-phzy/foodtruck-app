import { View, Text } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

interface FlatListCardProps {
    readonly title: string;
    readonly children: React.ReactNode;
}

export default function FlatListCard({ title, children }: FlatListCardProps) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>{title}</Text>
            </View>
            {children}
        </View>
    );
}

const styles = ScaledSheet.create({
    cardContainer: {
        backgroundColor: theme.colors.white,
        padding: theme.padding.sm,
        borderRadius: "10@ms",
        width: "100%",
        boxShadow: "0px 0px 10px rgba(0,0,0,.2)",
        gap: "10@ms",
    },
    cardHeader: {
        paddingVertical: theme.padding.xxs,
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 1,
    },
    cardHeaderText: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.md,
        fontWeight: "bold",
    },
});

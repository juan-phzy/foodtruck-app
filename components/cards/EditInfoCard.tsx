import { View, Text } from "react-native";
import React from "react";
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface EditInfoCardProps {
    readonly title: string;
    readonly text: string;
    readonly link?: any; // fix with correct types
    readonly onPress?: () => void;
}

export default function EditInfoCard({
    title,
    text,
    link,
    onPress,
}: EditInfoCardProps) {
    const router = useRouter();
    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>{title}</Text>
                <Text style={styles.infoText}>{text}</Text>
            </View>
            <MaterialCommunityIcons
                style={styles.infoIcon}
                name="chevron-right"
                onPress={() => {
                    if (link) {
                        router.push(link);
                    } else if (onPress) {
                        onPress();
                    }
                }}
            />
        </View>
    );
}

const styles = ScaledSheet.create({
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xs,
        borderRadius: theme.radius.md,
        borderColor: theme.colors.gray,
        borderWidth: 0.5,
        boxShadow: "0 0px 10px 0px rgba(0, 0, 0, 0.1)",
    },
    infoTextContainer: {
        gap: theme.padding.xxs,
    },
    infoTitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
        fontWeight: "bold",
    },
    infoText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.grayDark,
    },
    infoIcon: {
        fontSize: theme.fontSize.xl,
        color: theme.colors.black,
    },
});

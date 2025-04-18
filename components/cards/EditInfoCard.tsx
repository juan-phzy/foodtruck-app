import { View, Text } from "react-native";
import React from "react";
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface EditInfoCardProps {
    readonly title: string;
    readonly text: string;
    readonly link: string;
}

export default function EditInfoCard({ title, text, link }: EditInfoCardProps) {
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
                onPress={()=> router.push(`/profile/settings/edit/${link}`)}
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
        borderRadius: theme.radius.sm,
        borderColor: theme.colors.gray,
        borderWidth: 0.5,
        boxShadow: "0 0px 10px rgba(0, 0, 0, 0.1)",
    },
    infoTextContainer: {
        gap: "1@ms",
    },
    infoTitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
        fontWeight: "bold",
    },
    infoText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.black,
    },
    infoIcon: {
        fontSize: theme.fontSize.xl,
        color: theme.colors.black,
    },
});

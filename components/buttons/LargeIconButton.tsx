import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LargeIconButtonProps extends TouchableOpacityProps {
    readonly text: string;
    readonly icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export default function LargeIconButton({ text, icon, onPress }: LargeIconButtonProps) {
    return (
        <TouchableOpacity style={styles.rootContainer} onPress={onPress}>
            <MaterialCommunityIcons name={icon} size={ms(45)} color={theme.colors.primary} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "110@ms",
        borderRadius: "15@ms",
        backgroundColor: theme.colors.primaryLight,
        gap: theme.padding.sm,
    },
    text: {
        fontSize: theme.fontSize.md,
        color: theme.colors.primary,
    },
});

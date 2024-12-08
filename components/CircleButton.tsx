import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import theme from "@/theme/theme";

type CircleButtonProps = Readonly<{
    icon: React.ReactNode;
    onPress: () => void;
}>;

export default function CircleButton({ icon, onPress }: CircleButtonProps) {
    return (
        <Pressable style={styles.buttonContainer} onPress={onPress}>
            <View style={styles.iconContainer}>{icon}</View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainer: {
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
    },
});

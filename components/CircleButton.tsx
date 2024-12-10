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
        shadowColor: theme.colors.black,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    iconContainer: {
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
    },
});

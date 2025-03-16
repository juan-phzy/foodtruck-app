import theme from "@/assets/theme";
import { TextInput } from "react-native";

import { ScaledSheet } from "react-native-size-matters";

// GENERAL COMPONENT

interface NormTextInputProps {
    readonly radius?: "sm" | "md" | "lg" | "full";
}

export default function NormTextInput({ radius }: NormTextInputProps) {
    return (
        <TextInput
            style={[
                styles.inputText,
                radius === "sm" && styles.radiusSm,
                radius === "md" && styles.radiusMd,
                radius === "lg" && styles.radiusLg,
                radius === "full" && styles.radiusFull,
            ]}
            placeholder="Search for a food truck..."
            placeholderTextColor={theme.colors.primaryInactive}
        />
    );
}

const styles = ScaledSheet.create({
    inputText: {
        width: "100%",
        borderColor: "white",
        borderWidth: 3,
        backgroundColor: theme.colors.white,
        color: theme.colors.primary,
        paddingHorizontal: "15@ms",
        paddingVertical: "5@ms",
        fontSize: "12@ms",
    },
    radiusSm: {
        borderRadius: "5@ms",
    },
    radiusMd: {
        borderRadius: "10@ms",
    },
    radiusLg: {
        borderRadius: "15@ms",
    },
    radiusFull: {
        borderRadius: "20@ms",
    },
});

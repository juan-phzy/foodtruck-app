import theme from "@/assets/theme";
import { TextInput } from "react-native";

import { ScaledSheet } from "react-native-size-matters";

// GENERAL COMPONENT

interface TextInputStandardProps {
    readonly radius?: "sm" | "md" | "lg" | "full";
    readonly placeholder?: string;
    readonly fontSize?: number;
}

export default function TextInputStandard({ radius, placeholder, fontSize }: TextInputStandardProps) {
    return (
        <TextInput
            style={[
                styles.inputText,
                radius === "sm" && styles.radiusSm,
                radius === "md" && styles.radiusMd,
                radius === "lg" && styles.radiusLg,
                radius === "full" && styles.radiusFull,
                { fontSize: fontSize}
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.primaryInactive}
        />
    );
}

const styles = ScaledSheet.create({
    inputText: {
        width: "100%",
        backgroundColor: theme.colors.white,
        color: theme.colors.primary,
        padding: theme.padding.sm,
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

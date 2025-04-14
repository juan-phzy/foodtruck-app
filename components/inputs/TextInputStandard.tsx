import theme from "@/assets/theme";
import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

import { ScaledSheet } from "react-native-size-matters";

// GENERAL COMPONENT

export interface TextInputStandardProps extends TextInputProps {
    readonly radius?: "sm" | "md" | "lg" | "full";
    readonly placeholder?: string;
    readonly fontSize?: number;
    readonly fontColor?: string;
}

const TextInputStandard = forwardRef<TextInput, TextInputStandardProps>(
    ({ radius, placeholder, fontSize, fontColor, ...rest }, ref) => {
        return (
            <TextInput
                ref={ref ?? undefined}
                style={[
                    styles.inputText,
                    radius === "sm" && styles.radiusSm,
                    radius === "md" && styles.radiusMd,
                    radius === "lg" && styles.radiusLg,
                    radius === "full" && styles.radiusFull,
                    { fontSize: fontSize, color: fontColor },
                ]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.primaryInactive}
                {...rest}
            />
        );
    }
);

const styles = ScaledSheet.create({
    inputText: {
        height: "40@ms",
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.padding.sm,
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

export default TextInputStandard;

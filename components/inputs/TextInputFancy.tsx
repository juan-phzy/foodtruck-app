/**
 * @file CustomTextInput.tsx
 * @description A reusable custom text input component with a label and stylized input field.
 *
 * Used In:
 * - create-account.tsx
 * - sign-in.tsx
 *
 * Features:
 * - Displays a label above the input field.
 * - Supports custom placeholder text.
 * - Accepts `secureTextEntry` for password fields.
 * - Handles `onChangeText` for dynamic updates.
 * - Styled with a unique left border and bottom border for a modern look.
 * - Uses React Native's `TextInput` for user input handling.
 * - Ensures accessibility and visual clarity with appropriate colors.
 */

// React & React Native Imports
import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

// Theme & Styles
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";

// Type Definition for Component Props
interface TextInputFancyProps extends TextInputProps {
    readonly label: string; // Label text for the input field
    readonly required?: boolean; // Optional prop to indicate if the field is required
}

/**
 * TextInputFancy Component
 * A reusable text input field with a label.
 * Uses our signature design from figma.
 */
export default function TextInputFancy({
    label,
    required,
    ...rest
}: TextInputFancyProps) {
    return (
        <View style={styles.inputWrapper}>
            <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={styles.label}>{label}</Text>

                {required && (
                    <Text
                        style={{
                            color: theme.colors.red,
                            fontSize: theme.fontSize.xs,
                        }}
                    >
                        * Required
                    </Text>
                )}
            </View>
            <TextInput
                style={styles.textInput}
                placeholderTextColor={theme.colors.whiteInactive}
                {...rest}
            />
        </View>
    );
}

const styles = ScaledSheet.create({
    inputWrapper: {
        width: "100%",
        gap: 5,
    },
    label: {
        color: theme.colors.white,
        fontSize: theme.fontSize.sm,
    },
    textInput: {
        color: theme.colors.white,
        fontSize: theme.fontSize.xs,
        padding: theme.padding.sm,
        borderBottomLeftRadius: "20@ms",
        borderBottomWidth: 1,
        borderLeftWidth: 2,
        borderColor: theme.colors.primary,
    },
});

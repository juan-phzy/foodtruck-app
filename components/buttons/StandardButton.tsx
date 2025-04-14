/**
 * @file StandardButton.tsx
 * @description A customizable button component that supports different styles, padding, font sizes, and widths.
 *
 * Used In:
 * - create-account.tsx
 * - sign-in.tsx
 * - NearbyTrucks.tsx
 *
 * Features:
 * - Four style variations: `dark`, `light`, `outlineDark`, and `outlineLight`.
 * - Adjustable width (`fill` for full width, `fit` for auto width).
 * - Customizable text size and padding.
 * - Uses a `Pressable` component for better user interactions.
 * - Supports `disabled` state with visual feedback.
 */

// React & React Native Imports
import React from "react";
import { Text, TouchableOpacity } from "react-native";

// Theme & Styles
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Type Definition for Component Props
type ButtonProps = Readonly<{
    style?: "dark" | "light" | "outlineDark" | "outlineLight"; // Button style options
    text: string; // Text to display on the button
    onPress: () => void; // Callback function when the button is pressed
    width?: "fill" | "fit"; // Determines if the button spans full width or auto width
    horizontalPadding?: number; // Customizable horizontal padding
    verticalPadding?: number; // Customizable vertical padding
    fontSize?: number; // Customizable font size
    disabled?: boolean; // If true, disables button interaction
    icon?: keyof typeof MaterialCommunityIcons.glyphMap; // Optional icon prop
}>;

/**
 * StandardButton Component
 * A reusable and customizable button with various styles and configurations.
 */
export default function StandardButton({
    style = "dark", // Default button style
    text,
    onPress,
    width = "fill", // Default to full width
    horizontalPadding = theme.padding.sm, // Default horizontal padding
    verticalPadding = theme.padding.xxs, // Default vertical padding
    fontSize = theme.fontSize.xs, // Default font size
    disabled = false, // Default: button is enabled
    icon, // Optional icon prop
}: ButtonProps) {
  
    const getTextColor = (style: ButtonProps["style"]): string => {
        switch (style) {
            case "dark":
            case "outlineLight":
                return theme.colors.white;
            case "light":
            case "outlineDark":
                return theme.colors.primary;
            default:
                return theme.colors.white;
        }
    };

    return (
        <TouchableOpacity
            onPress={!disabled ? onPress : undefined} // Disable interaction if disabled
            style={[
                styles.base,
                styles[style], // Apply the selected style
                disabled && styles.disabledButton, // Apply disabled styles if necessary
                {
                    paddingHorizontal: horizontalPadding,
                    paddingVertical: verticalPadding,
                    width: width === "fill" ? "100%" : "auto", // Conditional width
                },
            ]}
        >
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={fontSize + 5}
                    color={getTextColor(style)}
                />
            )}
            <Text
                style={[
                    styles.text,
                    styles[`${style}Text`], // Apply correct text color
                    disabled && styles.disabledText, // Apply disabled text color
                    { fontSize },
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

// Styles for the StandardButton Component
const styles = ScaledSheet.create({
    // Base button style
    base: {
        flexDirection: "row",
        borderRadius: "20@ms", // Rounded corners
        justifyContent: "center",
        alignItems: "center",
        gap: "10@ms", // Space between icon and text
    },

    // Button style variants
    dark: {
        backgroundColor: theme.colors.primary,
        borderWidth: "2@ms",
        borderColor: theme.colors.primary,
    },
    light: {
        backgroundColor: theme.colors.white,
        borderWidth: "2@ms",
        borderColor: theme.colors.white,
    },
    outlineLight: {
        backgroundColor: "transparent",
        borderWidth: "2@ms",
        borderColor: theme.colors.primary,
    },
    outlineDark: {
        backgroundColor: "transparent",
        borderWidth: "2@ms",
        borderColor: theme.colors.primary,
    },

    // Disabled button styles
    disabledButton: {
        backgroundColor: theme.colors.grayDark, // Gray out the button
        borderColor: theme.colors.grayDark, // Border also turns gray
    },

    // Text styles for each variant
    text: {
        fontWeight: "medium",
        textAlign: "center",
    },
    darkText: {
        color: theme.colors.white,
    },
    lightText: {
        color: theme.colors.primary,
    },
    outlineLightText: {
        color: theme.colors.white,
    },
    outlineDarkText: {
        color: theme.colors.primary,
    },
    disabledText: {
        color: theme.colors.grayInactive,
    },
});

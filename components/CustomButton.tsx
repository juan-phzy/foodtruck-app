/**
 * @file CustomButton.tsx
 * @description A customizable button component that supports different styles, padding, font sizes, and widths.
 *
 * Features:
 * - Four style variations: `dark`, `light`, `outlineDark`, and `outlineLight`.
 * - Adjustable width (`fill` for full width, `fit` for auto width).
 * - Customizable text size and padding.
 * - Uses a `Pressable` component for better user interactions.
 */

// React & React Native Imports
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

// Theme & Styles
import theme from "@/theme/theme";

// Type Definition for Component Props
type ButtonProps = Readonly<{
  style?: "dark" | "light" | "outlineDark" | "outlineLight"; // Button style options
  text: string; // Text to display on the button
  onPress: () => void; // Callback function when the button is pressed
  width?: "fill" | "fit"; // Determines if the button spans full width or auto width
  horizontalPadding?: number; // Customizable horizontal padding
  verticalPadding?: number; // Customizable vertical padding
  fontSize?: number; // Customizable font size
}>;

/**
 * CustomButton Component
 * A reusable and customizable button with various styles and configurations.
 */
export default function CustomButton({
  style = "dark", // Default button style
  text,
  onPress,
  width = "fill", // Default to full width
  horizontalPadding = 10, // Default horizontal padding
  verticalPadding = 5, // Default vertical padding
  fontSize = 12, // Default font size
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        styles[style], // Apply the selected style
        {
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
          width: width === "fill" ? "100%" : "auto", // Conditional width
        },
      ]}
    >
      <Text style={[styles.text, styles[`${style}Text`], { fontSize }]}>
        {text}
      </Text>
    </Pressable>
  );
}

// Styles for the CustomButton Component
const styles = StyleSheet.create({
  // Base button style
  base: {
    borderRadius: 20, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
  },

  // Button style variants
  dark: {
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  light: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  outlineLight: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  outlineDark: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },

  // Text styles for each variant
  text: {
    fontWeight: "medium",
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
});

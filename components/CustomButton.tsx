import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import theme from "@/theme/theme";

type ButtonProps = Readonly<{
  style?: "dark" | "light" | "outlineDark" | "outlineLight";
  text: string;
  onPress: () => void;
  width?: "fill" | "fit";
  horizontalPadding?: number;
  verticalPadding?: number;
  fontSize?: number;
}>;

export default function CustomButton({
  style = "dark", // Default style
  text,
  onPress,
  width = "fill", // Default width
  horizontalPadding = 10, // Default horizontal padding
  verticalPadding = 5, // Default vertical padding
  fontSize = 12, // Default font size
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        styles[style], // Apply the style based on the "style" prop
        {
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
          width: width === "fill" ? "100%" : "auto", // Handle width based on prop
        },
      ]}
    >
      <Text style={[styles.text, styles[`${style}Text`], { fontSize }]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Base style for the button
  base: {
    borderRadius: 20, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
  },

  // Style variants
  dark: {
    backgroundColor: theme.colors.primary,
  },
  light: {
    backgroundColor: theme.colors.white,
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

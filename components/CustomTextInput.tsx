/**
 * @file CustomTextInput.tsx
 * @description A reusable custom text input component with a label and stylized input field.
 *
 * Features:
 * - Displays a label above the input field.
 * - Supports custom placeholder text.
 * - Styled with a unique left border and bottom border for a modern look.
 * - Uses React Native's `TextInput` for user input handling.
 * - Ensures accessibility and visual clarity with appropriate colors.
 */

// React & React Native Imports
import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

// Theme & Styles
import theme from "@/theme/theme";

// Type Definition for Component Props
interface CustomTextInputProps {
  readonly label: string; // Label text for the input field
  readonly placeholder: string; // Placeholder text inside the input
}

/**
 * CustomTextInput Component
 * A reusable text input field with a label.
 */
export default function CustomTextInput({ label, placeholder }: CustomTextInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.whiteInactive} // Placeholder text color for readability
      />
    </View>
  );
}

// Styles for the CustomTextInput Component
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "column", // Align label and input vertically
    width: "100%", // Ensures full width
    gap: 5, // Space between label and input field
  },
  label: {
    color: theme.colors.white, // Label text color
    fontSize: 14, // Font size for clarity
  },
  textInput: {
    color: theme.colors.white, // Input text color
    backgroundColor: "transparent", // No background color
    paddingHorizontal: 10, // Padding inside input field
    paddingVertical: 10, // Padding inside input field
    borderBottomLeftRadius: 20, // Bottom-left rounded corner
    borderBottomWidth: 1, // Bottom border for styling
    borderLeftWidth: 2, // Left border for styling
    borderColor: theme.colors.primary, // Border color to match theme
    fontSize: 12, // Font size for input text
  },
});

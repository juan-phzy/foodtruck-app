import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import theme from "@/theme/theme";

interface CustomTextInputProps {
  readonly label: string;
  readonly placeholder: string;
}

export default function CustomTextInput({ label, placeholder }: CustomTextInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.whiteInactive} // Optional for placeholder styling
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "column", // Arrange label and input vertically
    width: "100%", // Full width of parent
    gap: 5
  },
  label: {
    color: theme.colors.white, // Label text color
    fontSize: 14,
  },
  textInput: {
    color: theme.colors.white, // Input text color
    backgroundColor: "transparent", // Optional: Set background
    paddingHorizontal: 10, // Inner padding for the input text
    paddingVertical: 10, // Inner padding for the input text
    borderBottomLeftRadius: 20, // Rounded bottom-left corner
    borderBottomRightRadius: 0, // No rounding for other corners
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderWidth: 0, // Reset default borders
    borderLeftWidth: 2, // Left border
    borderBottomWidth: 1, // Bottom border
    borderColor: theme.colors.primary, // Border color
    fontSize: 12, // Font size
  },
});

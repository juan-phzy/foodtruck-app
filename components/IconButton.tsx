/**
 * @file IconButton.tsx
 * @description A reusable button component with an icon and a label.
 * 
 * Used In:
 * - sign-in.tsx: renders phone and email sign-in buttons
 *
 * Features:
 * - Displays an icon inside a circular container.
 * - Shows a text label beside the icon.
 * - Accepts a custom background color for the icon.
 * - Uses React Native's `Pressable` for interactive touch feedback.
 * - Ensures accessibility with clear visual spacing and styling.
 */

// React & React Native Imports
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Theme & Styles
import theme from '@/assets/theme';

// Type Definition for Component Props
type IconButtonProps = Readonly<{
  icon: React.ReactNode; // Icon element to be displayed
  label: string; // Text label beside the icon
  iconBackground: string; // Background color for the icon container
  onPress: () => void; // Callback function triggered on press
}>;

/**
 * IconButton Component
 * A button with an icon and a label.
 */
export default function IconButton({
  icon,
  label,
  iconBackground,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Icon Container */}
      <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
        {icon}
      </View>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

// Styles for the IconButton Component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arranges icon and label horizontally
    alignItems: "center", // Aligns items vertically in the center
    gap: 10, // Space between icon and label
    alignSelf: "flex-start", // Ensures button does not stretch
  },
  iconContainer: {
    width: 40, // Fixed width for the icon container
    height: 40, // Fixed height for the icon container
    justifyContent: "center", // Centers the icon
    alignItems: "center", // Centers the icon
    borderRadius: 20, // Fully rounded for a circular look
  },
  label: {
    fontSize: 16, // Readable font size
    color: theme.colors.white, // Ensures good contrast on dark backgrounds
    fontWeight: "500", // Medium font weight for clarity
  },
});

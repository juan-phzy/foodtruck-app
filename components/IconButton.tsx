import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from "@/theme/theme";

type IconButtonProps = Readonly<{
  icon: React.ReactNode; // Pass the icon component as a prop
  label: string;
  iconBackground: string; // Background color for the icon container
  onPress: () => void; // Function triggered on press
}>;

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

const styles = StyleSheet.create({
  container: {
    // Flexbox
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // Space between icon and label

    // Size and Positioning
    alignSelf: "flex-start",

    // Borders
    borderWidth: 0,
    borderColor: theme.colors.white,
  },
  iconContainer: {
    // Size and Positioning
    width: 40,
    height: 40,

    // Flexbox
    justifyContent: "center",
    alignItems: "center",

    // Borders
    borderRadius: 20, // Fully rounded corners (half of width/height)
  },
  label: {
    // Typography
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: "medium",
  },
});

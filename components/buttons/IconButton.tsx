import { Pressable, View, Text } from "react-native";
import React from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { FontAwesome6 } from "@expo/vector-icons";

type IconButtonProps = Readonly<{
  status?: boolean;
  iconName: keyof typeof FontAwesome6.glyphMap;
  showManage: boolean;
  text: string;
  onPress: () => void;
}>;
export default function IconButton({
  status,
  iconName,
  showManage,
  text,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      style={styles.rootContainer}
      // Only enables onPress if no Manage button
      onPress={!showManage ? onPress : undefined}
    >
      <FontAwesome6
        name={iconName}
        size={ms(40)}
        color={theme.colors.primary}
      />
      <View style={styles.textView}>
        <Text style={styles.textTitle}>{text}</Text>
        {status == null ? null : (
          <Text style={[styles.textStatus, status ? styles.green : styles.red]}>
            {status ? "OPEN" : "CLOSED"}
          </Text>
        )}
      </View>
      {showManage && (
        <Pressable style={styles.manageButton} onPress={onPress}>
          <Text style={styles.manageText}>Manage</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  rootContainer: {
    flexDirection: "row",
    borderRadius: "15@ms",
    // borderColor: "red",
    // borderWidth: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.padding.md,
    paddingVertical: theme.padding.xl,
    alignItems: "center",
    gap: "10@ms",
  },
  textView: {
    flex: 1,
    gap: "1@ms",
    // borderColor: "black",
    // borderWidth: 1,
  },
  textTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: "bold",
  },
  textStatus: {
    fontSize: theme.fontSize.sm,
    fontWeight: "bold",
  },
  green: {
    color: theme.colors.greenLight,
  },
  red: {
    color: theme.colors.red,
  },
  manageButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: "12@ms",
    // borderColor: "purple",
    // borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: theme.padding.md,
    paddingVertical: theme.padding.xxs,
  },
  manageText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
  },
});

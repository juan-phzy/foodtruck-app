import theme from "@/assets/theme";
import React from "react";
import { View} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface SideBySideRowProps {
  leftComponent: React.ReactNode;
  rightComponent: React.ReactNode;
}

export default function SideBySideRow({leftComponent,rightComponent}: SideBySideRowProps)  {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>{leftComponent}</View>
        <View style={styles.right}>{rightComponent}</View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginVertical: "10@ms",
    gap: "10@ms",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  divider: {
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: "1@ms",
  },
});




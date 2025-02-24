/**
 * @file TruckCardList.tsx
 * @description Displays a list of food truck cards in a vertical list format.
 *
 * Features:
 * - Uses React Native's `FlatList` for optimized rendering of food trucks.
 * - Each truck is displayed using the `TruckCardSmall` component.
 * - Includes dividers between list items for better visual separation.
 */

import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import TruckCardSmall from "./TruckCardSmall";
import { FoodTruck } from "@/types";

interface TruckCardListProps {
  trucks: FoodTruck[];
}

const TruckCardList: React.FC<TruckCardListProps> = ({ trucks }) => {
  return (
    <FlatList
      data={trucks}
      keyExtractor={(item) => item.id} // Ensures unique keys for each truck
      renderItem={({ item }) => (
        <View>
          <TruckCardSmall truck={item} />
          <View style={styles.divider} />
        </View>
      )}
      showsVerticalScrollIndicator={false} // Hides vertical scrollbar for cleaner UI
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    marginVertical: 5,
  },
});

export default TruckCardList;

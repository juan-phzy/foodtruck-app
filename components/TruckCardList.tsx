import React, { useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import TruckCardSmall from "./TruckCardSmall";
import { FoodTruck } from "@/types";

interface TruckCardListProps {
  trucks: FoodTruck[];
}

const TruckCardList: React.FC<TruckCardListProps> = ({ trucks }) => {
  // Optimize `renderItem` using useCallback
  const renderItem = useCallback(
    ({ item }: { item: FoodTruck }) => <TruckCardSmall truck={item} />,
    []
  );

  return (
    <FlatList
      data={trucks}
      keyExtractor={(item) => item.id} // Ensures unique keys for each truck
      renderItem={renderItem}
      showsVerticalScrollIndicator={false} // Hides vertical scrollbar for cleaner UI
      initialNumToRender={10} // Reduce initial render time
      maxToRenderPerBatch={10} // Optimize batch rendering
      windowSize={5} // Adjusts the number of items kept in memory
      getItemLayout={(_, index) => ({
        length: 80, // Approximate height of each row
        offset: 80 * index,
        index,
      })} // Enables smooth scrolling
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

export default React.memo(TruckCardList); // Prevents unnecessary re-renders

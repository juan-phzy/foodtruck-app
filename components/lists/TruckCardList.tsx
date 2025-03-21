import React, { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import TruckCardSmall from "@/components/cards/TruckCardSmall";
import { FoodTruck } from "@/types";

interface TruckCardListProps {
  trucks: FoodTruck[];
  pressable: boolean;
}

const TruckCardList: React.FC<TruckCardListProps> = ({ trucks, pressable }) => {
  // Optimize `renderItem` using useCallback
  const renderItem: ListRenderItem<FoodTruck> = useCallback(
    ({ item }) => <TruckCardSmall truck={item} pressable={pressable} />,
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
    />
  );
};

export default React.memo(TruckCardList); // Prevents unnecessary re-renders

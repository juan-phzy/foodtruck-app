import React, { useCallback } from "react";
import { FlatList } from "react-native";
import TruckCardSmall from "@/components/TruckCardSmall";
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

export default React.memo(TruckCardList); // Prevents unnecessary re-renders

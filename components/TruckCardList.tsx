import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import TruckCardSmall from "./TruckCardSmall";
import { FoodTruck } from "@/types";

interface TruckCardListProps {
  trucks: FoodTruck[];
}

const TruckCardList: React.FC<TruckCardListProps> = ({
  trucks,
}) => {
  return (
    <FlatList
      data={trucks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <>
          <TruckCardSmall
            truck={item}
          />
          <View style={styles.divider} />
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default TruckCardList;

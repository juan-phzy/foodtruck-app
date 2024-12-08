import React from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import theme from "@/theme/theme";

interface Truck {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface TruckListCardProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  trucks: Truck[];
}

const TruckListCard: React.FC<TruckListCardProps> = ({
  isExpanded,
  onToggleExpand,
  trucks,
}) => {
  return (
    <View style={[styles.card, isExpanded && styles.expanded]}>
      <Pressable onPress={onToggleExpand}>
        <Text style={styles.toggleText}>
          {isExpanded ? "Collapse" : "Nearby Food Trucks"}
        </Text>
      </Pressable>
      {isExpanded && (
        <FlatList
          data={trucks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.truckItem}>
              <Text style={styles.truckName}>{item.name}</Text>
              <Text style={styles.truckDetails}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
  },
  expanded: {
    height: "50%",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  truckItem: {
    marginVertical: 10,
  },
  truckName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  truckDetails: {
    fontSize: 14,
    color: theme.colors.gray,
  },
});

export default TruckListCard;

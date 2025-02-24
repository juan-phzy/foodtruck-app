/**
 * @file NearbyTrucksCard.tsx
 * @description Displays a card listing nearby food trucks with filtering and sorting options.
 * 
 * Used In:
 * - index.tsx
 * 
 * Features:
 * - Expands and collapses to show/hide nearby food truck list.
 * - Allows sorting trucks by rating or distance.
 * - Provides a category filter that opens a modal.
 * - Uses memoization to optimize sorting performance.
 */

// React & Hooks
import React, { useState, useMemo } from "react";

// React Native Components
import { StyleSheet, View, Text, Pressable } from "react-native";

// Expo & Third-Party Libraries
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

// Theme & Types
import theme from "@/theme/theme";
import { FoodTruck } from "@/types";

// State Management (Zustand)
import useFilterStore from "@/store/useFilterStore";

// Custom Components
import CustomButton from "./CustomButton";
import TruckCardList from "./TruckCardList";


interface NearbyTrucksCardProps {
    isCategoryActive: boolean;
    trucks: FoodTruck[];
}

const NearbyTrucksCard: React.FC<NearbyTrucksCardProps> = ({
    isCategoryActive,
    trucks,
}) => {
    const { toggleCategoryModal } = useFilterStore();

    const [isExpanded, setIsExpanded] = useState(false);
    const [sortBy, setSortBy] = useState<"rating" | "distance" | null>(null);

    /**
     * Memoized sorted list of food trucks to optimize re-renders.
     */
    const sortedTrucks = useMemo(() => {
        if (sortBy === "rating") return [...trucks].sort((a, b) => b.rating - a.rating);
        if (sortBy === "distance") return [...trucks].sort((a, b) => a.distance - b.distance);
        return trucks;
    }, [trucks, sortBy]);

    return (
        <BlurView intensity={10} style={[styles.card, isExpanded && styles.expanded]}>
            {/* Title Bar */}
            <View style={styles.titleBar}>
                <Text style={styles.titleText}>Nearby Food Trucks</Text>
                <Pressable 
                    onPress={() => setIsExpanded((prev) => !prev)} 
                    style={styles.dropdownButton}
                >
                    <Ionicons 
                        name={isExpanded ? "chevron-down" : "chevron-up"} 
                        size={30} 
                        color={theme.colors.primary} 
                    />
                </Pressable>
            </View>

            {/* Filter Bar */}
            <View style={styles.filterBar}>
                <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1 }}>Filters:</Text>
                
                <CustomButton
                    style={isCategoryActive ? "dark" : "outlineDark"}
                    verticalPadding={5}
                    fontSize={12}
                    width="fit"
                    text="Category"
                    onPress={toggleCategoryModal}
                />
                
                <CustomButton
                    style={sortBy === "distance" ? "dark" : "outlineDark"}
                    verticalPadding={5}
                    fontSize={12}
                    width="fit"
                    text="Distance"
                    onPress={() => setSortBy(sortBy === "distance" ? null : "distance")}
                />
                
                <CustomButton
                    style={sortBy === "rating" ? "dark" : "outlineDark"}
                    verticalPadding={5}
                    fontSize={12}
                    width="fit"
                    text="Rating"
                    onPress={() => setSortBy(sortBy === "rating" ? null : "rating")}
                />
            </View>

            {/* Truck List */}
            <TruckCardList trucks={sortedTrucks} />
        </BlurView>
    );
};

const styles = StyleSheet.create({
    card: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 200,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: "hidden",
        flexDirection: "column",
        gap: 10,
    },
    expanded: {
        height: 500,
    },
    titleBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    dropdownButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    filterBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: 10,
        gap: 5,
        width: "100%",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1,
    },
});

export default NearbyTrucksCard;

/**
 * @file NearbyTrucks.tsx
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
import { View, Text, Pressable } from "react-native";

// Expo & Third-Party Libraries
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

// Theme & Types
import theme from "@/assets/theme";
import { FoodTruck } from "@/types";
import { ms, ScaledSheet } from "react-native-size-matters";

// State Management (Zustand)
import useFilterStore from "@/store/useFilterStore";

// Custom Components
import StandardButton from "@/components/buttons/StandardButton";
import TruckCardList from "@/components/lists/TruckCardList"

interface NearbyTrucksProps {
    trucks: FoodTruck[];
}

const NearbyTrucks: React.FC<NearbyTrucksProps> = ({ trucks }) => {
    const { toggleCategoryModal, categoryFilters } = useFilterStore();

    const [isExpanded, setIsExpanded] = useState(false);
    const [sortBy, setSortBy] = useState<"rating" | "distance" | null>(null);

    /**
     * Memoized sorted list of food trucks to optimize re-renders.
     */
    const sortedTrucks = useMemo(() => {
        if (sortBy === "rating")
            return [...trucks].sort((a, b) => b.rating - a.rating);
        if (sortBy === "distance")
            return [...trucks].sort((a, b) => a.distance - b.distance);
        return trucks;
    }, [trucks, sortBy]);

    return (
        <BlurView
            intensity={10}
            style={[styles.card, isExpanded && styles.expanded]}
        >
            {/* Title Bar */}
            <View style={styles.titleBar}>
                <Text style={styles.titleText}>Nearby Food Trucks</Text>
                <Pressable
                    onPress={() => setIsExpanded((prev) => !prev)}
                    style={styles.dropdownButton}
                >
                    <Ionicons
                        name={isExpanded ? "chevron-down" : "chevron-up"}
                        size={ms(30)}
                        color={theme.colors.primary}
                    />
                </Pressable>
            </View>

            {/* Filter Bar */}
            <View style={styles.filterBar}>
                <Text style={styles.filterBarText}>Filters:</Text>

                <StandardButton
                    style={categoryFilters.length > 0 ? "dark" : "outlineDark"}
                    verticalPadding={theme.padding.xxs}
                    fontSize={theme.fontSize.xs}
                    width="fit"
                    text="Category"
                    onPress={toggleCategoryModal}
                />

                <StandardButton
                    style={sortBy === "distance" ? "dark" : "outlineDark"}
                    verticalPadding={theme.padding.xxs}
                    fontSize={theme.fontSize.xs}
                    width="fit"
                    text="Distance"
                    onPress={() =>
                        setSortBy(sortBy === "distance" ? null : "distance")
                    }
                />

                <StandardButton
                    style={sortBy === "rating" ? "dark" : "outlineDark"}
                    verticalPadding={theme.padding.xxs}
                    fontSize={theme.fontSize.xs}
                    width="fit"
                    text="Rating"
                    onPress={() =>
                        setSortBy(sortBy === "rating" ? null : "rating")
                    }
                />
            </View>

            {/* Truck List */}
            <TruckCardList trucks={sortedTrucks} pressable={true} />
        </BlurView>
    );
};

const styles = ScaledSheet.create({
    card: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "30%",
        paddingTop: theme.padding.xs,
        paddingHorizontal: theme.padding.md,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0px -2px 25px 2px rgba(0, 0, 0, .3)",
        borderTopLeftRadius: "15@ms",
        borderTopRightRadius: "15@ms",
        overflow: "hidden",
        gap: "10@ms",
    },
    expanded: {
        height: "65%",
    },
    titleBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    titleText: {
        fontSize: theme.fontSize.lg,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    dropdownButton: {
        width: "30@ms",
        height: "30@ms",
        justifyContent: "center",
        alignItems: "center",
    },
    filterBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: "10@ms",
        gap: "5@ms",
        width: "100%",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1,
    },
    filterBarText: {
        fontSize: theme.fontSize.md,
        fontWeight: "bold",
        flex: 1,
    },
});

export default NearbyTrucks;

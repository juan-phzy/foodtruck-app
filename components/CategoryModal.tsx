/**
 * @file CategoryModal.tsx
 * @description This component displays a modal where users can filter food trucks based on categories.
 * 
 * Used In:
 * - index.tsx: Used in the main app file to render the category filters selection modal.
 *
 * Features:
 * - Displays a list of selectable food categories.
 * - Uses Zustand for global state management.
 * - Implements `FlatList` for optimized performance with category selection.
 * - Allows users to toggle category selections dynamically.
 * - Includes a "Clear All" button to reset category filters.
 * - Uses memoization (`useCallback`) to optimize performance.
 * - Provides a back button to close the modal.
 */

// React & Hooks
import React, { useCallback } from "react";

// React Native Components
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// State Management (Zustand)
import useFilterStore from "@/store/useFilterStore";

// Constants & Theme
import { CATEGORIES } from "@/constants";
import theme from "@/theme/theme";

// Get screen dimensions for responsive UI scaling
const { width, height } = Dimensions.get("window");

const CategoryModal: React.FC = () => {
    // Zustand store hooks for category state management
    const {
        categoryFilters,
        updateCategories,
        clearCategoryFilters,
        toggleCategoryModal,
    } = useFilterStore();

    /**
     * Handles category selection/deselection.
     * Memoized with `useCallback` to prevent unnecessary re-renders.
     */
    const handleCategoryPress = useCallback(
        (category: string) => {
            updateCategories(category);
        },
        [updateCategories]
    );

    return (
        <View style={styles.categoryModal}>
            <View style={styles.categoryHeader}>
                {/* Gradient Background */}
                <LinearGradient
                    colors={["rgba(255, 132, 0, 0.9)", "rgba(255, 132, 0, 0)"]}
                    style={styles.gradient}
                />
                <Pressable
                    style={styles.backBtnContainer}
                    onPress={toggleCategoryModal} // Uses Zustand store function
                >
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color={theme.colors.white}
                    />
                </Pressable>
            </View>

            {/* Category Title Bar */}
            <View style={styles.categoryTitleBar}>
                <Text style={styles.title}>Select Categories</Text>
                <Pressable style={{ paddingHorizontal: 15 }} onPress={clearCategoryFilters}>
                    <Text style={styles.clearText}>Clear All</Text>
                </Pressable>
            </View>

            {/* Category Selection List */}
            <FlatList
                style={styles.categoryListView}
                columnWrapperStyle={styles.columnWrapper} // Adds spacing between columns
                data={CATEGORIES}
                numColumns={3}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <Pressable
                        style={[
                            styles.categoryButton,
                            categoryFilters.includes(item.name)
                                ? styles.categorySelected
                                : {},
                        ]}
                        onPress={() => handleCategoryPress(item.name)}
                    >
                        <Image
                            source={{ uri: item.url }}
                            style={styles.image}
                        />
                        <Text style={styles.btnText}>{item.name}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryModal: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.white,
        zIndex: 100,
    },
    categoryHeader: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 80,
        paddingBottom: 30,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    backBtnContainer: {
        padding: 10,
        position: "relative",
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryTitleBar: {
        flexDirection: "row",
        position: "relative",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingVertical: 20,
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    clearText: {
        color: theme.colors.primary,
        fontSize: 16,
    },
    categoryListView: {
        flex: 1,
        marginHorizontal: 10,
        position: "relative",
    },
    columnWrapper: {
        justifyContent: "space-between",
    },
    categoryButton: {
        position: "relative",
        width: width * 0.28,
        height: width * 0.28,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        gap: 5,
        backgroundColor: theme.colors.primarySuperLight,
    },
    btnText: {
        color: theme.colors.black,
        fontSize: 12,
    },
    image: {
        width: "50%",
        height: "50%",
    },
    categorySelected: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
    },
});

export default CategoryModal;

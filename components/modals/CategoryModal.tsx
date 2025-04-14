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
    TouchableOpacity,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// State Management (Zustand)
import useFilterStore from "@/store/useFilterStore";

// Constants & Theme
import { CATEGORIES } from "@/constants";
import theme from "@/assets/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, s, ScaledSheet } from "react-native-size-matters";

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

    const renderSeparator = () => <View style={{ height: ms(12) }} />;

    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                <LinearGradient
                    style={styles.gradient}
                    colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                    locations={[0.02, 0.12]}
                />
                <View style={styles.header}>
                    {/* Gradient Background */}

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={toggleCategoryModal}
                    >
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={ms(20)}
                            color={theme.colors.white}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Select Categories</Text>
                    <Pressable
                        style={{ paddingHorizontal: 15 }}
                        onPress={clearCategoryFilters}
                    >
                        <Text style={styles.clearText}>Clear All</Text>
                    </Pressable>
                </View>

                {/* Category Selection List */}
                <FlatList
                    style={styles.categoryListView}
                    columnWrapperStyle={styles.columnWrapper} // Adds spacing between columns
                    data={CATEGORIES}
                    horizontal={false}
                    numColumns={3}
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item) => item.name}
                    showsVerticalScrollIndicator={false}
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
            </SafeAreaView>
        </View>
    );
};

const styles = ScaledSheet.create({
    rootContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        backgroundColor: theme.colors.white,
    },
    safeAreaView: {
        flex: 1,
        gap: "15@ms",
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "5@ms",
        paddingHorizontal: theme.padding.sm,
        paddingTop: theme.padding.xxxxl,
        paddingBottom: theme.padding.lg,
        borderColor: theme.colors.grayInactive,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: theme.padding.xxs,
        position: "relative",
        backgroundColor: theme.colors.primary,
        borderRadius: "30@ms",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        flex: 1,
        fontSize: theme.fontSize.xl,
        color: theme.colors.primary,
        fontWeight: "bold",
    },
    clearText: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.md,
    },
    categoryListView: {
        flex: 1,
    },
    columnWrapper: {
        justifyContent: "space-evenly",
    },
    categoryButton: {
        width: width * 0.28,
        height: width * 0.28,
        borderRadius: "15@ms",
        justifyContent: "center",
        alignItems: "center",
        gap: "5@ms",
        backgroundColor: theme.colors.primaryLight,
    },
    btnText: {
        color: theme.colors.black,
        fontSize: theme.fontSize.xs,
        fontWeight: "semibold",
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

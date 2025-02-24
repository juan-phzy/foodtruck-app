/**
 * @file MenuModal.tsx
 * @description This component displays a modal with a food truck's menu items.
 * It allows users to browse different categories of food items and view details.
 * 
 * Used In:
 * - index.tsx
 *
 * Features:
 * - Displays food categories and items dynamically.
 * - Uses memoization to optimize rendering.
 * - Implements React Native's `FlatList` for efficient rendering of long lists.
 * - Provides a back button to close the modal.
 * - Ensures unique keys for list items to prevent React warnings.
 * 
 * TO DO:
 * - Move component definitions out of the parent component.
 *
 */

// React & Hooks
import React, { useMemo } from "react";

// React Native Components
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Constants & Theme
import theme from "@/theme/theme";

// Zustand Store
import useMenuModalStore from "@/store/useMenuModalStore";

// Types
import { FoodTruck } from "@/types";

// Props Interface
interface MenuModalProps {
    truck: FoodTruck;
}

const MenuModal: React.FC<MenuModalProps> = ({ truck }) => {
    /**
     * Memoized menu categories to prevent unnecessary recalculations.
     */
    const menuCategories = useMemo(() => truck.menu, [truck.menu]);
    const { toggleMenuModal } = useMenuModalStore();

    return (
        <View style={styles.menuModal}>
            {/* Header with Back Button */}
            <View style={styles.categoryHeader}>
                <LinearGradient
                    colors={["rgba(255, 132, 0, 0.9)", "rgba(255, 132, 0, 0)"]}
                    style={styles.gradient}
                />
                <Pressable
                    style={styles.backBtnContainer}
                    onPress={toggleMenuModal}
                >
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color={theme.colors.white}
                    />
                </Pressable>
            </View>

            {/* Menu Title */}
            <View style={styles.categoryTitleBar}>
                <Text style={styles.menuTitle}>Menu</Text>
            </View>

            {/* Menu List */}
            <FlatList
                style={styles.menuList}
                data={menuCategories}
                keyExtractor={(item, catIndex) => `${item.category + catIndex}`}
                ListHeaderComponent={<View style={styles.spacerHeader} />}
                ListFooterComponent={<View style={styles.spacerFooter} />}
                ItemSeparatorComponent={() => (
                    // TO DO
                    // Move this component definition out of
                    // the parent component and pass data as props.
                    <View style={styles.itemSeparator} />
                )}
                renderItem={({ item: menu }) => {
                    return (
                        <View style={styles.foodCategoryContainer}>
                            {/* Category Name */}
                            <View style={styles.categoryHeaderContainer}>
                                <Text style={styles.categoryText}>
                                    {menu.category}
                                </Text>
                            </View>

                            {/* Food Items */}
                            <FlatList
                                data={menu.items}
                                keyExtractor={(item, index) =>
                                    `${item.name + index}`
                                }
                                ItemSeparatorComponent={() => (
                                    // TO DO
                                    // Move this component definition out of
                                    // the parent component and pass data as props.
                                    <View style={styles.itemSeparator} />
                                )}
                                renderItem={({ item }) => (
                                    <View style={styles.foodItemContainer}>
                                        {/* Food Details */}
                                        <View style={styles.foodDetails}>
                                            <Text style={styles.foodName}>
                                                {item.name}
                                            </Text>
                                            <Text>{item.description}</Text>
                                            <Text>{item.price}</Text>
                                        </View>
                                        {/* Food Image */}
                                        <Image
                                            source={{ uri: item.imageUrl }}
                                            style={styles.foodImage}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    menuModal: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.white,
        zIndex: 100,
    },
    categoryHeader: {
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
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryTitleBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingVertical: 20,
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    menuList: {
        flex: 1,
        paddingHorizontal: 10,
    },
    spacerHeader: {
        height: 10,
    },
    spacerFooter: {
        height: 20,
    },
    itemSeparator: {
        height: 10,
    },
    foodCategoryContainer: {
        backgroundColor: theme.colors.white,
        padding: 10,
        borderRadius: 10,
        width: "100%",
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    categoryHeaderContainer: {
        paddingVertical: 5,
        borderBottomColor: "rgba(0,0,0,.1)",
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 20,
    },
    foodItemContainer: {
        flexDirection: "row",
        overflow: "hidden",
        borderRadius: 5,
    },
    foodDetails: {
        flex: 1,
        alignItems: "flex-start",
        gap: 5,
    },
    foodName: {
        fontWeight: "bold",
    },
    foodImage: {
        width: 100,
        height: 100,
    },
});

export default MenuModal;

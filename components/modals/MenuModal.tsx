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


// React Native Components
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Constants & Theme
import theme from "@/assets/theme";

// Zustand Store
import useMenuModalStore from "@/store/useMenuModalStore";

// Types
import { Trucks } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import FlatListCard from "@/components/cards/FlatListCard";
import ItemCard from "@/components/cards/ItemCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

// Props Interface
interface MenuModalProps {
    truck: Trucks;
}

const MenuModal: React.FC<MenuModalProps> = ({ truck }) => {
    /**
     * Memoized menu categories to prevent unnecessary recalculations.
     */

    const menu = useQuery(
        api.menus.getSingleMenu,
        truck.menu_id
            ? {
                  menuId: truck.menu_id,
              }
            : "skip"
    )?.menu;

    const { toggleMenuModal } = useMenuModalStore();

    const renderSeparator = () => {
        return <View style={styles.separator} />;
    };

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
                        onPress={toggleMenuModal}
                    >
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={ms(20)}
                            color={theme.colors.white}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Menu</Text>
                </View>

                <FlatList
                    // style={{flex:1, borderColor:"red", borderWidth:5}}
                    data={menu}
                    keyExtractor={(menu, index) => menu.category + index}
                    renderItem={({ item: menu }) => (
                        <View style={styles.cardContainer}>
                            <FlatListCard title={menu.category}>
                                <FlatList
                                    data={menu.items}
                                    keyExtractor={(item, index) =>
                                        item.name + index
                                    }
                                    ItemSeparatorComponent={renderSeparator}
                                    renderItem={({ item }) => (
                                        <ItemCard item={item} />
                                    )}
                                />
                            </FlatListCard>
                        </View>
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
        gap: "10@ms",
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
    cardContainer: {
        width: "100%",
        padding: theme.padding.sm,
    },
    separator: {
        height: 1,
        backgroundColor: theme.colors.gray,
        marginVertical: "10@ms",
    },
});

export default MenuModal;

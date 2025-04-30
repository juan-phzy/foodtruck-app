import React, { useState } from "react";
import {
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useBusinessStore } from "@/store/useBusinessStore";
import StandardButton from "@/components/buttons/StandardButton";
import theme from "@/assets/theme";
import { showToast } from "@/utils/showToast";
import EditInfoInput from "@/components/inputs/EditInfoInput";

export default function AddMenuPage() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { business } = useBusinessStore();

    const createMenu = useMutation(api.menus.createMenu);

    const [menuName, setMenuName] = useState("");

    const [categories, setCategories] = useState([
        {
            category: "New Category 1",
            items: [{ name: "New Item 1", description: "", price: "" }],
        },
    ]);

    const addCategory = () => {
        const newCategoryName = `New Category ${categories.length + 1}`;
        setCategories((prev) => [
            ...prev,
            {
                category: newCategoryName,
                items: [{ name: "New Item 1", description: "", price: "" }],
            },
        ]);
    };

    const removeCategory = (categoryName: string) => {
        if (categories.length === 1) return;
        setCategories((prev) =>
            prev.filter((cat) => cat.category !== categoryName)
        );
    };

    const addItem = (categoryName: string) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.category === categoryName
                    ? {
                          ...cat,
                          items: [
                              ...cat.items,
                              {
                                  name: `New Item ${cat.items.length + 1}`,
                                  description: "",
                                  price: "",
                              },
                          ],
                      }
                    : cat
            )
        );
    };

    const removeItem = (categoryName: string, itemIndex: number) => {
        setCategories((prev) =>
            prev.map((cat) => {
                if (cat.category === categoryName) {
                    if (cat.items.length === 1) return cat;
                    return {
                        ...cat,
                        items: cat.items.filter((_, idx) => idx !== itemIndex),
                    };
                }
                return cat;
            })
        );
    };

    const updateCategoryField = (
        oldCategoryName: string,
        newCategoryName: string
    ) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.category === oldCategoryName
                    ? { ...cat, category: newCategoryName }
                    : cat
            )
        );
    };

    const updateItemField = (
        categoryName: string,
        itemIndex: number, // <<< instead of using name
        field: "name" | "description" | "price",
        value: string
    ) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.category === categoryName
                    ? {
                          ...cat,
                          items: cat.items.map((item, idx) =>
                              idx === itemIndex
                                  ? { ...item, [field]: value }
                                  : item
                          ),
                      }
                    : cat
            )
        );
    };

    const validateAndSubmit = async () => {
        const categoryNames = new Set<string>();

        for (const category of categories) {
            if (!category.category.trim()) {
                showToast({
                    type: "error",
                    title: "Validation Error",
                    message: "All categories must have a name.",
                });
                return;
            }
            if (categoryNames.has(category.category.trim())) {
                showToast({
                    type: "error",
                    title: "Validation Error",
                    message: "Category names must be unique.",
                });
                return;
            }
            categoryNames.add(category.category.trim());

            const itemNames = new Set<string>();
            for (const item of category.items) {
                if (!item.name.trim() || !item.price) {
                    showToast({
                        type: "error",
                        title: "Validation Error",
                        message: "Each item must have a name and price.",
                    });
                    return;
                }
                if (itemNames.has(item.name.trim())) {
                    showToast({
                        type: "error",
                        title: "Validation Error",
                        message: `Items in ${category.category} must have unique names.`,
                    });
                    return;
                }
                itemNames.add(item.name.trim());
            }
        }

        if (!business) {
            showToast({
                type: "error",
                title: "Error",
                message: "No business found.",
            });
            return;
        }

        try {
            await createMenu({
                business_id: business._id,
                name: menuName,
                menu: categories.map((cat) => ({
                    category: cat.category,
                    items: cat.items.map((item) => ({
                        name: item.name,
                        description: item.description,
                        price: parseFloat(item.price),
                    })),
                })),
            });

            showToast({
                type: "success",
                title: "Success",
                message: "Menu created successfully!",
            });
            router.back();
        } catch (error) {
            console.error(error);
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to create menu.",
            });
        }
    };

    return (
        <View
            style={[styles.rootContainer, { paddingTop: insets.top + ms(25) }]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Menu Builder</Text>
                <MaterialCommunityIcons
                    name="close"
                    size={ms(32)}
                    color={theme.colors.primary}
                    onPress={router.back}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                <EditInfoInput
                    title="Menu Name"
                    value={menuName}
                    onChange={(text) => {setMenuName(text)}}
                    placeholder="Enter Menu Name"
                    keyboardType="default"
                />
                {categories.map((category, index) => (
                    <View key={"cat" + index} style={styles.categoryCard}>
                        <View style={styles.categoryHeader}>
                            <TextInput
                                style={styles.categoryTitle}
                                value={category.category}
                                onChangeText={(text) =>
                                    updateCategoryField(category.category, text)
                                }
                                placeholder="Category Name"
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    removeCategory(category.category)
                                }
                                disabled={categories.length === 1}
                            >
                                <MaterialCommunityIcons
                                    name="close-circle-outline"
                                    size={24}
                                    color={
                                        categories.length === 1
                                            ? "grey"
                                            : theme.colors.primary
                                    }
                                />
                            </TouchableOpacity>
                        </View>

                        {category.items.map((item, itemIndex) => (
                            <View
                                key={"item" + itemIndex}
                                style={styles.itemContainer}
                            >
                                <TextInput
                                    style={styles.input}
                                    placeholder="Item Name"
                                    value={item.name}
                                    onChangeText={(text) =>
                                        updateItemField(
                                            category.category,
                                            itemIndex,
                                            "name",
                                            text
                                        )
                                    }
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    value={item.price}
                                    keyboardType="decimal-pad"
                                    onChangeText={(text) =>
                                        updateItemField(
                                            category.category,
                                            itemIndex,
                                            "price",
                                            text
                                        )
                                    }
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Description"
                                    value={item.description}
                                    onChangeText={(text) =>
                                        updateItemField(
                                            category.category,
                                            itemIndex,
                                            "description",
                                            text
                                        )
                                    }
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        removeItem(category.category, itemIndex)
                                    }
                                    disabled={category.items.length === 1}
                                    style={styles.removeItemButton}
                                >
                                    <MaterialCommunityIcons
                                        name="trash-can-outline"
                                        size={24}
                                        color={
                                            category.items.length === 1
                                                ? "grey"
                                                : "red"
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity
                            onPress={() => addItem(category.category)}
                            style={styles.addButton}
                        >
                            <MaterialCommunityIcons
                                name="plus-circle-outline"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <Text style={styles.addButtonText}>Add Item</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {/* Add Category Button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={addCategory}
                >
                    <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={32}
                        color={theme.colors.primary}
                    />
                    <Text style={styles.addButtonText}>Add Category</Text>
                </TouchableOpacity>

                {/* Submit Button */}
                <StandardButton
                    text="Create Menu"
                    onPress={validateAndSubmit}
                    style="dark"
                    fontSize={theme.fontSize.md}
                />
            </ScrollView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryExtraLight,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: theme.padding.sm,
        paddingHorizontal: theme.padding.sm,
    },
    title: {
        fontSize: theme.fontSize.xxl,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    scrollView: {
        paddingVertical: theme.padding.md,
        paddingHorizontal: theme.padding.sm,
        gap: theme.padding.sm,
    },
    categoryCard: {
        backgroundColor: theme.colors.white,
        padding: theme.padding.sm,
        borderRadius: theme.radius.md,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        gap: 8,
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    categoryTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: "bold",
        color: theme.colors.black,
        flex: 1,
    },
    itemContainer: {
        backgroundColor: theme.colors.primaryLight,
        padding: theme.padding.xs,
        borderRadius: theme.radius.sm,
        gap: 5,
    },
    input: {
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.grayInactive,
        borderWidth: 1,
        borderRadius: theme.radius.sm,
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xs,
        fontSize: theme.fontSize.sm,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms",
    },
    addButtonText: {
        fontSize: theme.fontSize.md,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    removeItemButton: {
        alignSelf: "flex-end",
        marginTop: "5@ms",
    },
});

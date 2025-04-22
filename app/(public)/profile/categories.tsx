/*
    When a category is selected,
    it must be saved to the database or removed if already in the user's favorites.
*/

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

// Constants & Theme
import { CATEGORIES } from "@/constants";
import theme from "@/assets/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { useRouter } from "expo-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Get screen dimensions for responsive UI scaling
const { width } = Dimensions.get("window");

const UserFavoriteCategories: React.FC = () => {
    console.log("");
    console.log(
        "___________________________________________________________________"
    );
    console.log(
        "app/(public)/profile/categories.tsx: Entered UserFavoriteCategories"
    );
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const renderSeparator = () => <View style={{ height: ms(12) }} />;

    const selectedCategories = useQuery(api.users.getUserCategories) ?? [];
    const toggleCategory = useMutation(api.users.toggleCategory);

    const isCategorySelected = (category: string) =>
        selectedCategories.includes(category);

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                locations={[0.02, 0.12]}
            />
            <View style={styles.header}>
                {/* Gradient Background */}

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={router.back}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={ms(20)}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Select Categories</Text>
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
                            isCategorySelected(item.name) &&
                                styles.categorySelected,
                        ]}
                        onPress={() => toggleCategory({ category: item.name })}
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

const styles = ScaledSheet.create({
    rootContainer: {
        position: "absolute",
        gap: "15@ms",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        backgroundColor: theme.colors.white,
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

export default UserFavoriteCategories;

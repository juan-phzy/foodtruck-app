import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import theme from "@/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORIES } from "@/constants";

interface CategoryModalProps {
    setShowCategoryModal: (show: boolean) => void;
    setCategoryFilters: (filters: string[]) => void;
    categoryFilters: string[];
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    setShowCategoryModal,
    setCategoryFilters,
    categoryFilters,
}) => {
    return (
        <View style={styles.categoryModal}>
            <View style={styles.categoryHeader}>
                {/* Gradient Background */}
                <LinearGradient
                    colors={["rgba(255, 132, 0, 0.9)", "rgba(255, 132, 0, 0)"]}
                    // locations={[0.2, 0.8]}
                    style={styles.gradient}
                />
                <Pressable
                    style={styles.backBtnContainer}
                    onPress={() => setShowCategoryModal(false)}
                >
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color={theme.colors.white}
                    />
                </Pressable>
            </View>

            <View style={styles.categoryTitleBar}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: theme.colors.primary,
                    }}
                >
                    Select Categories
                </Text>
                <Pressable
                    style={{ paddingHorizontal: 15 }}
                    onPress={() => setCategoryFilters([])}
                >
                    <Text
                        style={{
                            color: theme.colors.primary,
                            fontSize: 16,
                        }}
                    >
                        Clear All
                    </Text>
                </Pressable>
            </View>

            <FlatList
                style={styles.categoryListView}
                columnWrapperStyle={styles.columnWrapper} // Add gap between columns
                data={CATEGORIES}
                numColumns={3}
                renderItem={({ item }) => (
                    <Pressable
                        style={[
                            styles.categoryButton,
                            categoryFilters.includes(item.name)
                                ? styles.categorySelected
                                : {},
                        ]}
                        onPress={() => {
                            if (categoryFilters.includes(item.name)) {
                                setCategoryFilters(
                                    categoryFilters.filter(
                                        (name) => name !== item.name
                                    )
                                );
                            } else {
                                setCategoryFilters([
                                    ...categoryFilters,
                                    item.name,
                                ]);
                            }
                        }}
                    >
                        <Image
                            source={{ uri: item.url }}
                            style={styles.image}
                        />
                        <Text>{item.name}</Text>
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
    categoryTitleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingVertical: 20,
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    categoryListView: {
        flex: 1,
        marginHorizontal: 10,
    },
    columnWrapper: {
        justifyContent: "space-between", // Space between columns
    },
    categoryButton: {
        width: 120,
        height: 120,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        gap: 5,
        backgroundColor: theme.colors.primarySuperLight,
    },
    image: {
        width: 50,
        height: 50,
    },
    categorySelected: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
    },
    backBtnContainer: {
        padding: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 80,
        paddingBottom: 30,
    },
});

export default CategoryModal;
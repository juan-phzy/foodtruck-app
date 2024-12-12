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
import { FoodTruck } from "@/types";

interface MenuModalProps {
    closeMenu: () => void;
    truck: FoodTruck;
}

const MenuModal: React.FC<MenuModalProps> = ({ closeMenu, truck }) => {
    return (
        <View style={styles.menuModal}>
            <View style={styles.categoryHeader}>
                {/* Gradient Background */}
                <LinearGradient
                    colors={["rgba(255, 132, 0, 0.9)", "rgba(255, 132, 0, 0)"]}
                    // locations={[0.2, 0.8]}
                    style={styles.gradient}
                />
                <Pressable style={styles.backBtnContainer} onPress={closeMenu}>
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
                    Menu
                </Text>
            </View>

            <FlatList
                style={{ flex: 1, paddingHorizontal: 10}}
                data={truck.menu}
                ListHeaderComponent={() => <View style={{ height: 10 }} />}
                ListFooterComponent={() => <View style={{ height: 20 }} />}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                renderItem={({ item: menu }) => {
                    return (
                        <View style={styles.foodCategoryContainer}>
                            <View
                                style={{
                                    paddingVertical: 5,
                                    borderBottomColor: "rgba(0,0,0,.1)",
                                    borderBottomWidth: 1,
                                    marginBottom: 10,
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>
                                    {menu.category}
                                </Text>
                            </View>

                            <FlatList
                                style={{ flex: 1 }}
                                data={menu.items}
                                ItemSeparatorComponent={() => (
                                    <View style={{ height: 10 }} />
                                )}
                                renderItem={({ item }) => {
                                    return (
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                overflow: "hidden",
                                                borderRadius: 5,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    alignItems: "flex-start",
                                                    gap: 5,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {item.name}
                                                </Text>
                                                <Text>{item.description}</Text>
                                                <Text>{item.price}</Text>
                                            </View>
                                            <Image
                                                source={{ uri: item.imageUrl }}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                }}
                                            />
                                        </View>
                                    );
                                }}
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
});

export default MenuModal;

import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    Dimensions,
    ScrollView,
} from "react-native";
import SearchTruckCard from "@/components/SearchTruckCard";
import { CATEGORIES, FOOD_TRUCKS } from "@/constants";
import { useCallback } from "react";
import DividerList from "@/components/DividerList";
import theme from "@/assets/theme";
import { FoodTruck } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputStandard from "@/components/inputs/TextInputStandard";
import { LinearGradient } from "expo-linear-gradient";
import { ScaledSheet } from "react-native-size-matters";

const { width } = Dimensions.get("window");

export default function Search() {
    const renderItem = useCallback(
        ({ item }: { item: FoodTruck }) => <SearchTruckCard truck={item} />,
        []
    );

    return (
        <View style={styles.wholeContainer}>
            <SafeAreaView style={styles.safeAreaViewStyle}>
                {/* TOP CONTAINER: Includes search bar header and linear gradient */}
                <View style={styles.topContainer}>
                    <LinearGradient
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 132, 0, 0)",
                        ]}
                        locations={[0, .98]}
                        style={styles.gradient}
                    />
                    <TextInputStandard radius="full" />
                </View>

                {/* MIDDLE CONTAINER: Includes search categories, recommendations, top rated, and on the move */}
                <ScrollView style={styles.middleContainer}>
                    <DividerList
                        text="Search Categories"
                        list={CATEGORIES}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.categoryButton}
                                onPress={null}
                            >
                                <Image
                                    source={{ uri: item.url }}
                                    style={styles.image}
                                />
                                <Text style={styles.btnText}>{item.name}</Text>
                            </Pressable>
                        )}
                    />
                    <DividerList
                        text="Our Recommendations"
                        list={FOOD_TRUCKS}
                        keyExtractor={(truck) => truck.name}
                        renderItem={renderItem}
                    />
                    <DividerList
                        text="Top Rated"
                        list={FOOD_TRUCKS}
                        keyExtractor={(truck) => truck.name}
                        renderItem={renderItem}
                    />
                    <DividerList
                        text="On The Move"
                        list={FOOD_TRUCKS}
                        keyExtractor={(truck) => truck.name}
                        renderItem={renderItem}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    wholeContainer: {
        flex: 1,
        // borderColor: "red",
        // borderWidth: 4,
        backgroundColor: theme.colors.primary,
    },
    safeAreaViewStyle: {
        flex: 1,
        flexDirection: "column",
        // borderColor: "green",
        // borderWidth: 4,
    },
    topContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "10@ms",
        paddingVertical: "30@ms",
        backgroundColor: theme.colors.white,

        // borderColor: "blue",
        // borderWidth: 4,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    middleContainer: {
        gap: 10,
        padding: "10@ms",
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    categoryButton: {
        position: "relative",
        width: width * 0.21,
        height: width * 0.21,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        gap: 5,
        backgroundColor: theme.colors.primaryLight,
    },
    image: {
        width: "50%",
        height: "50%",
    },
    btnText: {
        color: theme.colors.primary,
        fontSize: 9.8,
        fontWeight: "bold",
    },
});

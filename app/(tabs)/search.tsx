import theme from "@/assets/theme";
import FlatListCard from "@/components/cards/FlatListCard";
import TruckCard from "@/components/cards/TruckCard";
import { CATEGORIES, FOOD_TRUCKS, SEARCH_SECTIONS } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

const { width } = Dimensions.get("window");

export default function Search() {
    const handleCategoryPress = (category: string) => {
        console.log(`Pressed Category: ${category}`);
    };

    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.safeAreaView}>
                {/* Header Section */}
                <View style={styles.header}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)",
                            "rgba(255, 255, 255, 1)",
                        ]}
                        locations={[0.1, 0.95]}
                    />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search Trucks"
                        placeholderTextColor={theme.colors.primaryInactive}
                    />
                </View>

                <ScrollView style={styles.body}>
                    {/* Individual Search Categories Card */}
                    <View style={styles.cardContainer}>
                        <FlatListCard title="Search Categories">
                            <FlatList
                                contentContainerStyle={styles.flatListGap}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={CATEGORIES}
                                keyExtractor={(item, index) =>
                                    item.name + index
                                }
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.categoryButton}
                                        onPress={() =>
                                            handleCategoryPress(item.name)
                                        }
                                    >
                                        <Image
                                            source={{ uri: item.url }}
                                            style={styles.image}
                                        />
                                        <Text style={styles.buttonText}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </FlatListCard>
                    </View>

                    {SEARCH_SECTIONS.map((section) => (
                        <View key={section.name} style={styles.cardContainer}>
                            <FlatListCard title={section.name}>
                                <FlatList
                                    contentContainerStyle={styles.flatListGap}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={section.trucks}
                                    keyExtractor={(truckId) =>
                                        truckId.toString()
                                    }
                                    renderItem={({ item: truckId }) => {
                                        const truck =
                                            FOOD_TRUCKS.find(
                                                (truck) =>
                                                    truck.id ==
                                                    truckId.toString()
                                            ) ?? null;
                                        /*
                                            Rendering the truck card here now
                                            instead of just text

                                            Added the truck prop to the TruckCard
                                            so that all the information can be
                                            passed down to the card
                                        */
                                        return truck ? (
                                            <TruckCard truck={truck} />
                                        ) : null;
                                    }}
                                />
                            </FlatListCard>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    safeAreaView: {
        flex: 1,
    },
    testText: {
        flex: 1,
        fontSize: "20@s",
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%",
    },
    header: {
        justifyContent: "center",
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xxxl,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBar: {
        fontSize: theme.fontSize.xs,
        backgroundColor: theme.colors.white,
        borderRadius: "30@ms",
        paddingHorizontal: theme.padding.md,
        paddingVertical: theme.padding.md,
    },
    body: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    cardContainer: {
        backgroundColor: theme.colors.white,
        padding: theme.padding.sm,
    },
    flatListGap: {
        gap: "10@ms",
    },
    categoryButton: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: "10@ms",
        justifyContent: "center",
        alignItems: "center",
        gap: "5@ms",
        backgroundColor: theme.colors.primaryLight,
    },
    image: {
        width: "50%",
        height: "50%",
    },
    buttonText: {
        fontSize: theme.fontSize.xxs,
    },
});

import { router, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

const dummyFavorites = [3, 7, 2, 9];
const dummyRecents = [5, 1, 8, 4, 6];

export default function SectionScreen() {
    const { section } = useLocalSearchParams();

    let data: number[] = [];
    let title: string = "";
    switch (section) {
        case "favorites":
            title = "Favorites";
            data = [4, 5, 10];
            break;
        case "recent":
            title = "Recently Viewed";
            data = [1, 8, 7, 9];
            break;
        case "ratings":
            title = "Ratings";
            data = [3, 4, 2, 6];
            break;
    }

    return (
        <View style={styles.rootContainer}>
            <SafeAreaView>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text>Go Back</Text>
                </TouchableOpacity>

                <Text style={styles.header}>
                    {title}
                </Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => <Text>{item}</Text>}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: "24@s",
        fontWeight: "bold",
    },
});

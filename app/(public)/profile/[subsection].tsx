import theme from "@/assets/theme";
import TruckCardSmall from "@/components/cards/TruckCardSmall";
import { FOOD_TRUCKS } from "@/constants";
import { FoodTruck } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";

export default function SectionScreen() {
    console.log("");
    console.log("___________________________________________________________________________");
    console.log("(public)/profile/[subsection].tsx: Entered Public Profile Subsection Screen"
    );
    const { subsection } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    let data: FoodTruck[] = [];
    let title: string = "";
    switch (subsection) {
        case "favorites":
            title = "Favorites";
            data = FOOD_TRUCKS.filter((truck) =>
                ["4", "5", "10"].includes(truck.id)
            );
            break;
        case "recent":
            title = "Recently Viewed";
            data = FOOD_TRUCKS.filter((truck) =>
                ["1", "8", "7", "9"].includes(truck.id)
            );
            break;
        case "ratings":
            title = "Ratings";
            data = FOOD_TRUCKS.filter((truck) =>
                ["3", "2", "6"].includes(truck.id)
            );
            break;
    }

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
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* Category Selection List */}
            <FlatList
                contentContainerStyle={styles.listContentStyle}
                data={data}
                horizontal={false}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TruckCardSmall truck={item} pressable={false} />
                )}
            />
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
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
    listContentStyle: {
        padding: theme.padding.sm,
    },
});

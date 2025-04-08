import theme from "@/assets/theme";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
import { LOCATION_SCREEN_TRUCKS } from "@/constants";
import IconButton from "@/components/buttons/IconButton";
import { Ionicons } from "@expo/vector-icons";

// Sample Data
const sampleLocationScreenTrucks = LOCATION_SCREEN_TRUCKS;

export default function Index() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Manage Trucks</Text>
                <Ionicons
                    name="add"
                    size={45}
                    color={theme.colors.primary}
                    onPress={() => console.log("Clicked Add Trucks")}
                />
            </View>
            {/* Manage Truck List */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {sampleLocationScreenTrucks.map((truck, index) => (
                    <IconButton
                        key={truck.name + index}
                        iconName={truck.type == "Truck" ? "truck" : "store"}
                        text={truck.name}
                        status={truck.status}
                        showManage={true}
                        onPress={() => console.log("Clicked Manage Truck")}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryLight,
        paddingHorizontal: theme.padding.xl,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: theme.padding.lg,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: theme.fontSize.xl,
        color: theme.colors.black,
    },
    scrollView: {
        gap: "10@ms",
		paddingBottom: theme.padding.md,
		// Leave some space at the bottom of scroll views
    },
});

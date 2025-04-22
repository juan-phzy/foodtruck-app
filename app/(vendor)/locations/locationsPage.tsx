import theme from "@/assets/theme";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
import { LOCATION_SCREEN_TRUCKS } from "@/constants";
import IconButton from "@/components/buttons/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

// Sample Data
const sampleLocationScreenTrucks = LOCATION_SCREEN_TRUCKS;

export default function LocationsScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Manage Trucks</Text>
                <MaterialCommunityIcons
                    name="plus"
                    size={45}
                    color={theme.colors.primary}
                    onPress={() => {console.log("Clicked Add Trucks")
                        router.push('/locations/addTruckPage') // Navigate to add truck page
                    }}
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
                        onPress={() => {
                            router.push(`/locations/${truck.name}`);
                        }}
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

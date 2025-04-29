import theme from "@/assets/theme";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
import IconButton from "@/components/buttons/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useBusinessStore } from "@/store/useBusinessStore";
import { showToast } from "@/utils/showToast";

export default function LocationsIndex() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const businessConvexID = useBusinessStore().business?._id;

    const trucks = useQuery(api.trucks.getTrucksByBusinessId, {
        business_convex_id: businessConvexID,
    });

    const menuCount = useQuery(
        api.menus.getMenusByBusiness,
        businessConvexID
            ? {
                  business_id: businessConvexID,
              }
            : "skip"
    )?.length;

    const handleAddTruck = () => {
        console.log("Clicked Add Trucks");
        if (menuCount === 0 || menuCount === undefined) {
            showToast({
                type: "error",
                title: "No Business Menus",
                message: "Please create a menu before adding a truck.",
            });
            return;
        }
        router.push("/locations/add-truck");
    };

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Manage Locations</Text>
                <MaterialCommunityIcons
                    name="plus"
                    size={45}
                    color={theme.colors.primary}
                    onPress={handleAddTruck}
                />
            </View>
            {/* Manage Truck List */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {trucks ? (
                    trucks.map((truck) => (
                        <IconButton
                            key={truck._id}
                            iconName="truck"
                            text={truck.truck_name}
                            status={truck.open_status}
                            showManage={true}
                            onPress={() => {
                                router.push(`/locations/${truck._id}`);
                            }}
                        />
                    ))
                ) : (
                    <Text
                        style={{
                            fontSize: theme.fontSize.md,
                            color: theme.colors.black,
                        }}
                    >
                        No trucks available.
                    </Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryExtraLight,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: theme.padding.md,
        paddingHorizontal: theme.padding.sm,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: theme.fontSize.xl,
        color: theme.colors.black,
    },
    scrollView: {
        gap: "10@ms",
        paddingVertical: theme.padding.md,
        paddingHorizontal: theme.padding.sm,
        // Leave some space at the bottom of scroll views
    },
});

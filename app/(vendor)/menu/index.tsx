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

export default function LocationsIndex() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const businessConvexID = useBusinessStore().business?._id;

    const menus = useQuery(
        api.menus.getMenusByBusiness,
        businessConvexID
            ? {
                  business_id: businessConvexID,
              }
            : "skip"
    );

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Manage Menus</Text>
                <MaterialCommunityIcons
                    name="plus"
                    size={45}
                    color={theme.colors.primary}
                    onPress={() => {
                        console.log("Clicked Add Trucks");
                        router.push("/menu/add-menu"); // Navigate to add truck page
                    }}
                />
            </View>
            {/* Manage Truck List */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {menus ? (
                    menus.map((menu) => (
                        <IconButton
                            key={menu._id}
                            iconName="view-list-outline"
                            text={menu.name}
                            showManage={true}
                            onPress={() => {
                                router.push(`/menu/${menu._id as string}` as any);
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

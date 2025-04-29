import { View, Text, TouchableOpacity } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { USER_SETTINGS_CONFIG } from "@/constants";

// Theme & Styling
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import IconButton from "@/components/buttons/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserStore } from "@/store/useUserStore";
import useTruckStore from "@/store/useTruckStore";
import useFilterStore from "@/store/useFilterStore";

export default function SettingsIndex() {
    console.log("");
    console.log("_____________________________________________________");
    console.log("app/(public)/profile/settings/index.tsx: Entered File");
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { reset:resetTruckStore } = useTruckStore();
    const { clearCategoryFilters } = useFilterStore();
    const { signOut } = useClerk();

    const handleSignOut = async () => {
        try {
            await signOut();
            resetTruckStore(); // Reset the truck store to clear any previous data
            clearCategoryFilters(); // Clear any category filters in the filter store
            router.replace("/(auth)/login");
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };
    const { currentUser } = useUserStore();

    const handleSettingPress = (link: string) => {
        if (link in USER_SETTINGS_CONFIG) {
            router.push(`/profile/settings/${link}`);
        } else {
            console.warn("Invalid settings link:", link);
        }
    };

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            <TouchableOpacity
                style={styles.goBackContainer}
                onPress={router.back}
            >
                <View style={styles.arrowButton}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        style={styles.arrowIcon}
                    />
                </View>
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons
                    name="account-circle"
                    size={70}
                    color={theme.colors.primary}
                />
                <Text
                    style={styles.headerNameText}
                >{`${currentUser!.first_name} ${currentUser!.last_name}`}</Text>
                <Text style={styles.headerEmailText}>{currentUser!.email}</Text>
            </View>
            {/* Profile Options */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {Object.entries(USER_SETTINGS_CONFIG).map(([key, config]) => (
                    <IconButton
                        key={config.link}
                        iconName={config.iconName}
                        text={config.setting}
                        showManage={false}
                        onPress={() => handleSettingPress(config.link)}
                    />
                ))}

                <IconButton
                    iconName="logout-variant"
                    text="Log Out"
                    showManage={false}
                    onPress={handleSignOut}
                />
            </ScrollView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryLight,
    },
    goBackContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.padding.md,
        paddingHorizontal: theme.padding.lg,
        gap: "5@ms",
    },
    arrowButton: {
        borderRadius: "20@ms",
        width: "30@ms",
        height: "30@ms",
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    arrowIcon: {
        fontSize: theme.fontSize.xl,
        color: theme.colors.white,
    },
    goBackText: {
        fontSize: theme.fontSize.md,
    },
    headerContainer: {
        paddingBottom: theme.padding.lg,
        paddingHorizontal: theme.padding.lg,
        alignItems: "center",
        gap: "5@ms",
    },
    headerNameText: {
        fontSize: theme.fontSize.xl,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    headerEmailText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
    },
    scrollView: {
        paddingVertical: theme.padding.sm,
        paddingHorizontal: theme.padding.lg,
        gap: "10@ms",
    },
});

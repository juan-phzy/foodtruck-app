import { View, Text, ActivityIndicator } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { VENDOR_SETTINGS } from "@/constants";

// Theme & Styling
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import IconButton from "@/components/buttons/IconButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { useVendorStore } from "@/store/useVendorStore";
import StandardButton from "@/components/buttons/StandardButton";

// Sample Data
const sampleSettings = VENDOR_SETTINGS;

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    const { currentVendor, isLoading } = useVendorStore();

    const { signOut } = useClerk();
    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/(auth)/login");
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading profile</Text>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <StandardButton
                    width="fit"
                    onPress={handleSignOut}
                    text="Sign Out"
                />
            </View>
        );
    }

    if (currentVendor === null) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ fontWeight: "bold" }}>
                    No User Found: Contact Support
                </Text>
                <StandardButton
                    width="fit"
                    onPress={handleSignOut}
                    text="Sign Out"
                />
            </View>
        );
    }

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <FontAwesome6
                    name="user-circle"
                    size={70}
                    color={theme.colors.primary}
                    onPress={() => console.log("Clicked Settings")}
                />
                <Text style={styles.headerNameText}>
                    {`${currentVendor.first_name} ${currentVendor.last_name}`}
                </Text>
                <Text style={styles.headerEmailText}>
                    {currentVendor.email}
                </Text>
            </View>
            {/* Profile Options */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {sampleSettings.map((setting, index) => (
                    <IconButton
                        key={setting.setting + index}
                        iconName={setting.iconName}
                        text={setting.setting}
                        showManage={false}
                        onPress={
                            setting.setting === "Log Out"
                                ? handleSignOut
                                : () =>
                                      console.log(
                                          `Clicked on ${setting.setting}`
                                      )
                        }
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = ScaledSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: "15@ms",
    },
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryLight,
        paddingHorizontal: theme.padding.xl,
    },
    headerContainer: {
        padding: theme.padding.lg,
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
        gap: "10@ms",
    },
});

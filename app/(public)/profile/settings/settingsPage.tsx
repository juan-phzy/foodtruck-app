import { View, Text, TouchableOpacity } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { router, useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { USER_SETTINGS } from "@/constants";

// Theme & Styling
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import IconButton from "@/components/buttons/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserStore } from "@/store/useUserStore";

// Sample Data
const sampleSettings = USER_SETTINGS;

export default function UserSettingsPage() {
    console.log("");
    console.log("____________________________________________________________");
    console.log("app/(public)/profile/settings.tsx: Entered UserSettings Page");
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { signOut } = useClerk();
    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/(auth)/login");
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };
    const { currentUser } = useUserStore();

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
                    onPress={() => console.log("Clicked Settings")}
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
                {sampleSettings.map((setting, index) => (
                    <IconButton
                        key={setting.setting + index}
                        iconName={setting.iconName}
                        text={setting.setting}
                        showManage={false}
                        onPress={
                            setting.setting === "Log Out"
                                ? handleSignOut
                                : () => {
                                      console.log(
                                          `Clicked on ${setting.setting}`
                                      );
                                      router.push("/profile/settings/edit/");
                                  }
                        }
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
    goBackContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.padding.md,
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
        gap: "10@ms",
    },
});

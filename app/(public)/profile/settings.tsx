import { View, Text, TouchableOpacity } from "react-native";
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
import { useUserStore } from "@/store/useUserStore";

// Sample Data
const sampleSettings = VENDOR_SETTINGS;

export default function UserSettings() {
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
            <TouchableOpacity style={{marginVertical:theme.padding.xl}} onPress={() => router.back()}>
                <Text style={{fontSize:theme.fontSize.md, fontWeight:"bold"}}>{`<-- Go Back`}</Text>
            </TouchableOpacity>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <FontAwesome6
                    name="user-circle"
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

import { View, Text } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { VENDOR_SETTINGS } from "@/constants";

// Theme & Styling
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import StandardButton from "@/components/buttons/StandardButton";
import IconButton from "@/components/buttons/IconButton";
import { FontAwesome6 } from "@expo/vector-icons";

// Sample Data
const sampleSettings = VENDOR_SETTINGS;

export default function Index() {
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
        <Text style={styles.headerNameText}>Sung Jinwoo</Text>
        <Text style={styles.headerEmailText}>sololeveling@gmail.com</Text>
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
                : () => console.log(`Clicked on ${setting.setting}`)
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
    // borderColor: theme.colors.primary,
    // borderWidth: 1,
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
    // borderColor: "blue",
    // borderWidth: 1,
    gap: "10@ms",
  },
});

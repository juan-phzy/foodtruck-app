import { View, Text, TouchableOpacity } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";

// Theme & Styling
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import StandardButton from "@/components/buttons/StandardButton";

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
            {/* Temporary Sign Out Button */}
            <StandardButton
                text="Sign Out"
                onPress={handleSignOut}
            />
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryLight,
    },
});

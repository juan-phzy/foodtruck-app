import {
    View,
    StyleSheet,
    FlatList,
    Text,
    ActivityIndicator,
} from "react-native";
import ProfileHeader from "@/components/profilePage/ProfileHeader";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PROFILE_SECTIONS } from "@/constants";
import LargeIconButton from "@/components/buttons/LargeIconButton";
import { router } from "expo-router";
import { useUserStore } from "@/store/useUserStore";
import { useClerk } from "@clerk/clerk-expo";
import StandardButton from "@/components/buttons/StandardButton";

export default function UserProfilePage() {
    const insets = useSafeAreaInsets();

    console.log(
        "_____________________________________________________________"
    );
    console.log(
        "(public)/profile/profilePage.tsx: Entered Public Profile Page"
    );

    const { currentUser, isLoading } = useUserStore();

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

    if (currentUser === null) {
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
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                locations={[0.01, 0.09]}
            />
            <ProfileHeader user={currentUser} link="/account/account-settings/" />
            <View style={styles.sections}>
                <FlatList
                    data={PROFILE_SECTIONS}
                    contentContainerStyle={styles.gap}
                    columnWrapperStyle={styles.gap}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <LargeIconButton
                            text={item.name}
                            icon={item.icon}
                            onPress={() => {
                                console.log(
                                    `Clicked ${item.name} button`)
                            }}
                        />
                    )}
                    numColumns={2}
                />
            </View>
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
        backgroundColor: theme.colors.white,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    sections: {
        padding: theme.padding.sm,
        borderBottomColor: theme.colors.grayLight,
        borderBottomWidth: 1,
    },
    gap: {
        gap: theme.padding.xs,
    },
});

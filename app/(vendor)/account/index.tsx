import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import ProfileHeader from "@/components/profilePage/ProfileHeader";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import StandardButton from "@/components/buttons/StandardButton";
import { useVendorStore } from "@/store/useVendorStore";
import { useBusinessStore } from "@/store/useBusinessStore";

export default function UserProfilePage() {
    const insets = useSafeAreaInsets();

    console.log("________________________________________");
    console.log("(vendor)/account/index.tsx: Entered File");

    const { currentVendor, isLoading: isVendorLoading } = useVendorStore();
    const { business, isLoading: isBusinessLoading } = useBusinessStore();

    const { signOut } = useClerk();
    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/(auth)/login");
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    if (isBusinessLoading || isVendorLoading) {
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

    if (business === null) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ fontWeight: "bold" }}>
                    No Business Found: Contact Support
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
            <ProfileHeader user={currentVendor} link="/account/settings/" />
            <View style={styles.sections}>
                <Text>Your Business</Text>
                <Text>{business.business_name}</Text>
                <Text>{business.primary_city}</Text>
                <Text>{business.phone_number}</Text>
                <Text>{business.email_link}</Text>
                <Text>{business.instagram_link}</Text>
                <Text>{business.twitter_link}</Text>
                <Text>{business.facebook_link}</Text>
                <Text>{business.website}</Text>
                <Text>{business.description}</Text>
                <Text>{business.categories}</Text>
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
});

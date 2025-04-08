// app/(tabs)/profile.tsx
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import ProfileHeader from "@/components/profilePage/ProfileHeader";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { PROFILE_SECTIONS } from "@/constants";
import LargeIconButton from "@/components/buttons/LargeIconButton";
import AchievementSection from "@/components/profilePage/AchievementSection";
import { router } from "expo-router";

import { useClerk, useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Profile() {
    const { user } = useUser();

    const { signOut } = useClerk();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/(auth)/login");

            // Redirect to your desired page
            //   Linking.openURL(Linking.createURL('/'))
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const clerkId = user?.id;
    const munchUser = useQuery(
        api.getUserProfile.getUserProfile,
        clerkId ? { userId: clerkId } : "skip"
    );

    if (munchUser === undefined) {
        return (
            <View style={styles.rootContainer}>
                <Text>Loading profile...</Text>
                <TouchableOpacity onPress={()=> handleSignOut()}>
                    <Text>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (munchUser === null) {
        return (
            <View style={styles.rootContainer}>
                <Text>No profile found for this user.</Text>
            </View>
        );
    }

    return (
        <View style={styles.rootContainer}>
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                locations={[0.01, 0.09]}
            />
            <SafeAreaView style={styles.safeAreaView}>
                <ProfileHeader user={munchUser} />
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
                                    router.push(
                                        `/(public)/profile/${item.link}`
                                    );
                                }}
                            />
                        )}
                        numColumns={2}
                    />
                </View>
                <AchievementSection />
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
        justifyContent: "center",
        alignItems: "center",
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    safeAreaView: {
        flex: 1,
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

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfileSettingsPage() {
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

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 120,
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Text>Go back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text>Sign Out</Text>
                </TouchableOpacity>
                <Text>settings</Text>
            </SafeAreaView>
        </View>
    );
}

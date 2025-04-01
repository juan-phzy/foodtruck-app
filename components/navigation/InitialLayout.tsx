import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;

        const inAuthScreen = segments[0] === "(auth)";

        if (!isSignedIn && !inAuthScreen) {
            console.log(
                "User is not signed in, redirecting to login screen from InitialLayout."
            );
            router.replace("/(auth)/login");
        } else if (isSignedIn && inAuthScreen) {
            console.log(
                "User is signed in, redirecting to (public) from InitialLayout."
            );
            router.replace("/");
        }
    }, [isLoaded, isSignedIn, segments]);

    if (!isLoaded) {
        return null; // or a loading spinner
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}

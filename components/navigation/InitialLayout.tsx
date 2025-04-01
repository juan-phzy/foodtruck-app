import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded || !user) return;

        const inAuthScreen = segments[0] === "(auth)";

        if (!isSignedIn && !inAuthScreen) {
            console.log("Not signed in, redirecting to login.");
            router.replace("/(auth)/login");
        } else if (isSignedIn && inAuthScreen) {
            const role = user.publicMetadata?.role;
            console.log(`Signed in as ${role}, redirecting...`);

            if (role === "vendor") {
                router.replace("/(vendor)");
            } else {
                router.replace("/(public)");
            }
        }
    }, [isLoaded, isSignedIn, segments, user]);

    if (!isLoaded) {
        return null; // Optionally add a spinner here
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}

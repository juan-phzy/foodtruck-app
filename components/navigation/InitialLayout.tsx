import { useEffect } from "react";
import { useRouter, useSegments, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const segments = useSegments();

    // Fetch vendor profile for onboarding status
    const vendorProfile = useQuery(
        api.vendors.getUserByClerkId,
        user && user.unsafeMetadata?.role === "vendor"
            ? { clerkId: user.id }
            : "skip"
    );

    useEffect(() => {
        if (!isLoaded || !user) return;

        const currentSegment = segments[0]; // e.g., "(auth)", "(public)", "(vendor)"
        const role = user.unsafeMetadata?.role;

        // Case 1: Not signed in → redirect to login unless already on auth screen
        if (!isSignedIn) {
            if (currentSegment !== "(auth)") {
                router.replace("/(auth)/login");
            }
            return;
        }

        // Case 2: Vendor logic
        if (role === "vendor") {
            const isOnboarded = vendorProfile?.is_onboarded;

            if (isOnboarded != undefined && !isOnboarded) {
                // Not onboarded → stay in auth routes only
                if (currentSegment !== "(auth)") {
                    router.replace("/(auth)/createBusiness/step1");
                }
            } else if (currentSegment === "(auth)" || currentSegment === "(public)") {
                // Onboarded vendors → redirect to vendor app
                router.replace("/(vendor)/locations/");
            }
        }

        // Case 3: Public user logic
        if (role === "public" && (currentSegment === "(auth)" || currentSegment === "(vendor)")) {
            router.replace("/(public)");
        }
    }, [isLoaded, isSignedIn, user, vendorProfile, segments]);

    return <Stack screenOptions={{ headerShown: false }} />;
}

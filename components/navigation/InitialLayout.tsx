/**
 * InitialLayout Component
 *
 * This layout is responsible for redirecting users based on their authentication status and role.
 *
 * Behavior:
 * - If not signed in and not on an auth screen → redirect to login
 * - If signed in and currently on an auth screen → redirect based on `publicMetadata.role`
 *   - "vendor" → /vendor layout
 *   - otherwise → /public layout
 *
 * Used as the entry point inside RootLayout.
 */

import { useEffect } from "react";

// Clerk Authentication
import { useAuth, useUser } from "@clerk/clerk-expo";

// Navigation
import { Stack, useRouter, useSegments } from "expo-router";

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
        router.replace("/");
      } else {
        router.replace("/(public)");
      }
    }
  }, [isLoaded, isSignedIn, segments, user]);

  if (!isLoaded) {
    return null; // You can replace this with a splash screen or loader
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

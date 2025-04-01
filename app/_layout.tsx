/**
 * RootLayout Component
 *
 * This is the main entry point for the application layout.
 * It sets up the navigation stack and wraps the app with the required providers.
 *
 * Features:
 * - Provides global session management via `SessionProvider`
 * - Wraps the app with `GestureHandlerRootView` for smooth gesture handling
 * - Uses `Stack` navigation from Expo Router for managing screen navigation
 * - Hides headers for all screens in the stack
 */

// React Native Libraries
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Expo Libraries
import { StatusBar } from "expo-status-bar";

// Context Providers
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

// Polyfills and Utilities
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InitialLayout from "@/components/navigation/InitialLayout";
import { Stack } from "expo-router";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error(
        "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
}

export default function RootLayout() {
    console.log("Entered RootLayout");
    return (
        <ClerkProvider tokenCache={tokenCache}>
            <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <StatusBar style="light" />
                    <InitialLayout />
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </ClerkProvider>
    );
}

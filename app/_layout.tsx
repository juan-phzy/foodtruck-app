// React Native Libraries
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Expo Libraries
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Context Providers
import { ClerkProvider } from "@clerk/clerk-expo";
import { SessionProvider } from "@/context/ctx";

// Polyfills and Utilities
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error(
        "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
}

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
export default function RootLayout() {
    return (
        <SessionProvider>
            <SafeAreaProvider>
                {/* GestureHandlerRootView is required for handling touch gestures in React Native */}
                <GestureHandlerRootView style={{ flex: 1 }}>
                    {/* Sets the status bar style to light (white text/icons) */}
                    <StatusBar style="light" />

                    {/* Stack navigation handles the main screen transitions */}
                    <Stack screenOptions={{ headerShown: false }}>
                        {/* Tab-based navigation screen (Main App) */}
                        <Stack.Screen name="(tabs)" />

                        {/* Authentication Screens */}
                        <Stack.Screen name="sign-in" />
                        <Stack.Screen name="create-account" />

                        {/* Fallback screen for undefined routes */}
                        <Stack.Screen name="+not-found" />
                    </Stack>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </SessionProvider>
    );
}

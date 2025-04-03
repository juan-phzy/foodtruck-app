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

// Polyfills and Utilities
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InitialLayout from "@/components/navigation/InitialLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";

export default function RootLayout() {
    console.log("Entered RootLayout");
    return (
        <ClerkAndConvexProvider>
            <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <StatusBar style="light" />
                    <InitialLayout />
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </ClerkAndConvexProvider>
    );
}

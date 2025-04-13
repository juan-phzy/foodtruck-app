/**
 * RootLayout Component
 *
 * This is the entry point of the app. It wraps the application in all global providers,
 * including:
 * - Clerk authentication context
 * - Convex backend provider
 * - Safe area support
 * - Gesture handler support
 *
 * It also renders the `InitialLayout` which manages app-level navigation and layout logic.
 */

import "react-native-get-random-values";

// Expo & React Native
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Providers & Layout
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import InitialLayout from "@/components/navigation/InitialLayout";

export default function RootLayout() {
  console.log("_______________________________");
  console.log("_layout.tsx: Entered RootLayout");
  console.log("_layout.tsx: Rendering InitialLayout Nav Logic");
  
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

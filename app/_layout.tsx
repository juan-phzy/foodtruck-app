// React Native Libraries
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Expo Libraries
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Context Providers
import { SessionProvider } from "@/context/ctx";

// Polyfills and Utilities
import "react-native-get-random-values";

//----------------------------------------------------------------------------
import { Alert } from "react-native";
import { useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import awsExports from "@/amplify_outputs.json";

Amplify.configure(awsExports);

const client = generateClient<Schema>(); // Backend connection
//----------------------------------------------------------------------------


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

  useEffect(() => {
          const testBackendConnection = async () => {
              try {
                  const { data } = await client.models.Trucks.list(); // Test API call
                  console.log("✅ Backend Connected! Retrieved data:", data);
                  Alert.alert("Success", "Backend is connected!");
              } catch (error) {
                  console.error("❌ Backend Connection Failed:", error);
                  Alert.alert("Error", "Backend connection failed. Check logs.");
              }
          };
  
          testBackendConnection(); // Run connection test
      }, []);

  return (
    // SessionProvider ensures authentication state is available throughout the app
    <SessionProvider>
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
    </SessionProvider>
  );
}

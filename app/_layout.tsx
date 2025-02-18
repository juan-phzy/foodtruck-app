import { Stack } from "expo-router"; //Handles stack-based navigation
import { StatusBar } from "expo-status-bar"; //Controls the status bar (light mode currently)
import { GestureHandlerRootView } from "react-native-gesture-handler"; //Enables gesture-based navigation (e.g., swiping back)
import { SessionProvider } from "@/context/ctx"; //Manages user authentication
import "react-native-get-random-values"; // Defined here to ensure it is loaded in first to prevent errors and exceptions, also only need to import here once

export default function RootLayout() {
    return (
        <SessionProvider> {/*Wraps the entire app to provide session data, Ensures authentication state (logged in or out) is accessible everywhere*/}
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="light" />
                <Stack> {/*Controls which screens are part of the stack navigator, The name values map directly to files inside the app/ folder.*/}
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false, //hides built in top bar since we have a defined UI*
                        }}
                    />
                    <Stack.Screen
                        name="sign-in"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="create-account"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="+not-found"
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack>
            </GestureHandlerRootView>
        </SessionProvider>
    );
}

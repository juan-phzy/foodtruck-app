import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SessionProvider } from "@/context/ctx";

export default function RootLayout() {
  return (
    <SessionProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign-in"
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

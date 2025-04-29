// app/(vendor)/menu/_layout.tsx
import { Stack } from "expo-router";

export const unstable_settings = {
    // This hides it from the tab bar
    tabBarStyle: { display: "none" },
    tabBarButton: () => null,
  };

export default function MenuLayout() {
    return <Stack screenOptions={{ headerShown: false }} />;
}

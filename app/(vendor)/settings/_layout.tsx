// app/(public)/profile/_layout.tsx
import { Stack } from "expo-router";

export default function VendorSettingScreenLayout() {
    return (
        <Stack
            initialRouteName="settingsPage"
            screenOptions={{ headerShown: false }}
        />
    );
}

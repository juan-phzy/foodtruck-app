// app/(public)/profile/_layout.tsx
import { Stack } from "expo-router";

export default function ManageTrucksScreenLayout() {
    return (
        <Stack
            initialRouteName="locationsPage"
            screenOptions={{ headerShown: false }}
        />
    );
}

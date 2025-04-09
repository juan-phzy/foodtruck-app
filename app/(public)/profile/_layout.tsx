// app/(public)/profile/_layout.tsx
import { Stack } from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack
            initialRouteName="profilePage"
            screenOptions={{ headerShown: false }}
        />
    );
}

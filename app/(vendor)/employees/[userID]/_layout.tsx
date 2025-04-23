// app/(public)/profile/_layout.tsx
import { Stack } from "expo-router";

export default function UserIDLayout() {
    return (
        <Stack
            initialRouteName="manageUser"
            screenOptions={{ headerShown: false }}
        />
    );
}

// app/(public)/profile/_layout.tsx
import { Stack } from "expo-router";

export default function ManageUserScreenLayout() {
    return (
        <Stack
            initialRouteName="manageUsersScreen"
            screenOptions={{ headerShown: false }}
        />
    );
}

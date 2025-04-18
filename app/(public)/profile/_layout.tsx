import { Stack } from "expo-router";

export default function ProfileLayout() {
    console.log("");
    console.log("___________________________________________________________________");
    console.log("app/(public)/profile/_layout.tsx: Entered Public User ProfileLayout");
    return (
        <Stack
            initialRouteName="profilePage"
            screenOptions={{ headerShown: false }}
        />
    );
}

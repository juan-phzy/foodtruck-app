import { Stack } from "expo-router";

export default function ProfileSettingsLayout() {
    console.log("");
    console.log(
        "__________________________________________________________________________"
    );
    console.log(
        "app/(public)/profile/settings/_layout.tsx: Entered Profile Settings Layout"
    );
    return <Stack screenOptions={{ headerShown: false }} />;
}

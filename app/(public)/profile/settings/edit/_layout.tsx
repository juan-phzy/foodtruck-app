import { Stack } from "expo-router";

export default function ProfileSettingsLayout() {
    console.log("");
    console.log("___________________________________________________________________________");
    console.log("app/(public)/profile/settings/edit/_layout.tsx: Entered Edit Profile Layout");
    return (
        <Stack
            initialRouteName="editPage"
            screenOptions={{ headerShown: false }}
        />
    );
}

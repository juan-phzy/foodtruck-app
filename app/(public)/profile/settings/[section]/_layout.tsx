// app/(public)/profile/settings/[section]/_layout.tsx
import { Stack } from "expo-router";

export default function SectionLayout() {
    console.log("");
    console.log(
        "_________________________________________________________________"
    );
    console.log(
        "app/(public)/profile/settings/[section]/_layout.tsx: Entered File"
    );

    return <Stack screenOptions={{ headerShown: false }} />;
}

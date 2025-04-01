// app/index.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      console.log("Not signed in — redirecting to login.");
      router.replace("/(auth)/login");
    } else {
      const role = user?.publicMetadata?.role;

      if (role === "vendor") {
        console.log("Signed in as vendor — redirecting to dashboard.");
        router.replace("/");
      } else {
        console.log("Signed in as user — redirecting to map.");
        router.replace('/');
      }
    }
  }, [isLoaded, isSignedIn]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

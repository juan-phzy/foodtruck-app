import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function Settings() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/login");

      // Redirect to your desired page
      //   Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={handleSignOut}>
        <Text style={{ width: 200, fontSize: 30 }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

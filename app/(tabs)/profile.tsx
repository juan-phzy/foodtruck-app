// app/(tabs)/profile.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import ProfileHeader from "@/components/profilePage/ProfileHeader";
import { useSession } from "@/context/ctx";

export default function Profile(){
    const { signOut } = useSession();
    return (
        <View style={styles.container}>
            <View style={{ height: 50 }}></View>

            <ProfileHeader
                name="Juan"
                level={1}
                phoneNumber="123-456-7890"
                email="juan@gmail.com"
                progress={0.75}
            />

            <TouchableOpacity onPress={signOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
});
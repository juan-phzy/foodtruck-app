import { View, Text } from "react-native";
import React from "react";
import ProfileHeader from "@/components/profilePage/ProfileHeader";
import { USER } from "@/constants";

export default function index() {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ProfileHeader user={USER} />
        </View>
    );
}

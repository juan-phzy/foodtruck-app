// app/(tabs)/profile.tsx
import React from "react";
import { View, StyleSheet} from "react-native";
import ProfileHeader from "@/components/profilePage/ProfileHeader";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { USER } from "@/constants";

export default function Profile() {
    return (
        <View style={styles.rootContainer}>
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                locations={[0.01, 0.09]}
            />
            <SafeAreaView style={styles.safeAreaView}>
                <ProfileHeader user={USER} />
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    safeAreaView: {
        flex: 1,
    },
});

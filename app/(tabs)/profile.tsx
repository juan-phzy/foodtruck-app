// app/(tabs)/profile.tsx
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ProfileHeader from "@/components/profilePage/ProfileHeader";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { PROFILE_SECTIONS, USER } from "@/constants";
import LargeIconButton from "@/components/buttons/LargeIconButton";
import AchievementSection from "@/components/profilePage/AchievementSection";

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
                <View style={styles.sections}>
                    <FlatList
                        data={PROFILE_SECTIONS}
                        contentContainerStyle={styles.gap}
                        columnWrapperStyle={styles.gap}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <LargeIconButton
                                text={item.name}
                                icon={item.icon}
                            />
                        )}
                        numColumns={2}
                    />
                </View>
                <AchievementSection />
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
    sections: {
        padding: theme.padding.sm,
        borderBottomColor: theme.colors.grayLight,
        borderBottomWidth: 1,
    },
    gap: {
        gap: theme.padding.xs,
    },
});

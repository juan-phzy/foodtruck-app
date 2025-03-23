import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

export default function Test() {
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.colors.gray
    },
    safeAreaContainer: {
        flex: 1,
        padding: theme.padding.xxxl,
        justifyContent: "center",
        alignItems: "center",
    },
});

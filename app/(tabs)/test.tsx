import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

export default function HeightExamples() {
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <View
                    style={{
                        height: "50%",
                        width: "50%",
                        backgroundColor: theme.colors.primary,
                        boxShadow: "0px -5px 35px 10px rgba(0, 0, 0, 0.6)",
                    }}
                ></View>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
    },
    safeAreaContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

import React from "react";
import { FlatList, View, Text, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import FlatListCard from "@/components/cards/FlatListCard";
import ItemCard from "@/components/cards/ItemCard";

const { width, height } = Dimensions.get("window");

export default function HeightExamples() {
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
    },
    safeAreaContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: theme.padding.xl,
    },
});

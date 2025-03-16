import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

export default function HeightExamples() {
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.topSection}>
                    {[...Array(15).keys()].map((i) => (
                        <Text style={styles.box} key={i}>
                            {i}
                        </Text>
                    ))}
                </View>
                <Text>
                    The top section will adjust its height to fit the squares
                    within it. The squares themselves have a fixed width using
                    the screen's width from dimensions which will ultimately add
                    up and set the height for the entire top container.
                </Text>
                <ScrollView
                    style={styles.bottomSection}
                    contentContainerStyle={styles.scrollViewContentStyle}
                >
                    {[...Array(30).keys()].map((i) => (
                        <Text style={styles.text} key={i}>
                            This scrollable bottom section uses Dimension to
                            take up 30% of the screen's height
                        </Text>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = ScaledSheet.create({
    mainContainer: {
        /*
            Since this is automatically flex-column,
            the primary axis is vertical. So if we 
            set flex: 1, it will take up the entire
            height of the screen which is all of the 
            available space left in the primary axis.
         */
        flex: 1,
        borderColor: "red",
        borderWidth: 10,
    },
    safeAreaContainer: {
        flex: 1,
        justifyContent: "space-between",
        borderColor: "blue",
        borderWidth: 10,
    },
    topSection: {
        /* 
            height doesn't need to be set, 
            it will be determined by its children
        */
        borderColor: "green",
        borderWidth: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    box: {
        /*
            Uses the width variable from 
            Dimensions to create a square
        */
        width: width * 0.13,
        height: width * 0.13,
        backgroundColor: "red",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: "20@s",
        color: "white",
        borderColor: "black",
        borderWidth: 5,
    },
    bottomSection: {
        // This will take up 30% of the height of the screen
        maxHeight: height * 0.3,
        height: height * 0.3,
    },
    scrollViewContentStyle: {
        /*
            This will take up 100% of the height of the 
            ScrollView. Since the ScrollView is 30% of the 
            height of the screen, this will take up 100% of 
            that 30%.
        */
        justifyContent: "flex-start",
        gap: "10@s",
        backgroundColor: "yellow",
        borderColor: "purple",
        borderWidth: 10,
    },
    text: {
        paddingVertical: "5@s",
        textAlign: "center",
        backgroundColor: "gray",
        color: "white",
        fontSize: "12@s",
    },
});

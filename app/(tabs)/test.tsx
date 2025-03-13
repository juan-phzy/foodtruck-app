import { ScaledSheet } from "react-native-size-matters";
import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import theme from "@/theme/theme";

export default function Test() {

    const [direction, setDirection] = useState<boolean>(true);

    return (
        <View style={[styles.mainContainer, { flexDirection: direction ? "column" : "row" }]}>
            <View style={styles.topSection}></View>
            <View style={styles.middleSection}>
                <Text style={styles.textStyle}>
                    This is flexDirection: {direction ? "column" : "row"}
                </Text>
            </View>
            <View style={styles.bottomSection}>
                <TouchableOpacity onPress={() => setDirection(!direction)}>
                    <Text style={styles.textStyle}>Click To Change Direction</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    // Also goes from firstStyle to thirdStyle top-down
    mainContainer: {
        flex: 1,
        borderColor: "red",
        borderWidth: 10,
    },
    topSection: {
        flex: 1,
        backgroundColor: "orange",
        borderColor: "yellow",
        borderWidth: 5,
    },
    middleSection: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        borderColor: "blue",
        borderWidth: 5,
    },
    textStyle: {
        fontSize: "15@s",
        color: theme.colors.white,
        fontWeight: "bold",
    },
    bottomSection: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "purple",
        borderColor: "black",
        borderWidth: 5,
    },
});

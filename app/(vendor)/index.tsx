import theme from "@/assets/theme";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

export default function Index() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}></View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryLight,
    },
});

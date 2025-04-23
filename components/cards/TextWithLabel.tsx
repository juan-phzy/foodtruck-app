import theme from "@/assets/theme";
import { View, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface TextWithLabelProps {
    label: string;
    value?: string;
}

export default function TextWithLabel({ label, value }: TextWithLabelProps) {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        width: "100%",
        gap: theme.padding.xxs,
    },
    label: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.white,
        borderColor: theme.colors.primary,
        borderBottomWidth: 1,
    },
    value: {
        color: theme.colors.white,
        fontSize: theme.fontSize.xs,
    },
});

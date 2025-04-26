import { View, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const ToggleValue: React.FC<{
    value: string;
    checked: boolean;
    setChecked: () => void;
}> = ({ value, checked, setChecked }) => {
    return (
        <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <MaterialCommunityIcons
                name={checked ? "checkbox-marked" : "checkbox-blank-outline"}
                size={24}
                color={theme.colors.primary}
                onPress={setChecked}
            />
            <Text style={{ fontSize: theme.fontSize.sm }}>{value}</Text>
        </View>
    );
};

interface ToggleInputProps {
    readonly title: string;
    readonly value: boolean;
    readonly onToggle: (value: boolean) => void;
}

export default function ToggleInput({
    title,
    value,
    onToggle,
}: ToggleInputProps) {
    const [checked, setChecked] = useState(value);
    useEffect(() => {
        onToggle(checked);
    }, [checked]);
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>{title}</Text>
            <View
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
            >
                <ToggleValue
                    value={"Yes"}
                    checked={checked}
                    setChecked={() => setChecked(!checked)}
                />
                <ToggleValue
                    value={"No"}
                    checked={!checked}
                    setChecked={() => setChecked(!checked)}
                />
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xs,
        gap: "5@ms",
        backgroundColor: theme.colors.white,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: theme.radius.md,
        borderColor: theme.colors.gray,
        borderWidth: 0.5,
    },
    title: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: theme.colors.white,
        fontSize: theme.fontSize.md,
        color: theme.colors.black,
    },
});

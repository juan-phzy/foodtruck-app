import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

interface EditInfoInputProps {
    readonly title: string;
    readonly value: string;
    readonly keyboardType: KeyboardTypeOptions;
    readonly onChangeText: (text: string) => void;
}

export default function EditInfoInput({
    title,
    value,
    keyboardType,
    onChangeText,
}: EditInfoInputProps) {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
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

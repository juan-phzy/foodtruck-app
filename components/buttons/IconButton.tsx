import { Pressable, View, Text } from "react-native";
import React from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { FontAwesome6 } from "@expo/vector-icons";

type IconButtonProps = Readonly<{
    status?: boolean;
    iconName: keyof typeof FontAwesome6.glyphMap;
    showManage: boolean;
    text: string;
    onPress: () => void;
}>;
export default function IconButton({
    status,
    iconName,
    showManage,
    text,
    onPress,
}: IconButtonProps) {
    return (
        <Pressable
            style={styles.rootContainer}
            onPress={!showManage ? onPress : undefined}
        >
            <View style={styles.iconWrapper}>
                <FontAwesome6
                    name={iconName}
                    size={ms(35)}
                    color={theme.colors.primary}
                />
            </View>
            <View style={styles.textView}>
                <Text style={styles.textTitle}>{text}</Text>
                {status == null ? null : (
                    <Text
                        style={[
                            styles.textStatus,
                            status ? styles.green : styles.red,
                        ]}
                    >
                        {status ? "OPEN" : "CLOSED"}
                    </Text>
                )}
            </View>
            {showManage && (
                <Pressable style={styles.manageButton} onPress={onPress}>
                    <Text style={styles.manageText}>Manage</Text>
                </Pressable>
            )}
        </Pressable>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flexDirection: "row",
        borderRadius: "15@ms",
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.padding.md,
        paddingVertical: theme.padding.xl,
        alignItems: "center",
        gap: "5@ms",
    },
    iconWrapper: {
        flexDirection: "row",
        width: ms(50),
    },
    textView: {
        flex: 1,
        gap: "1@ms",
    },
    textTitle: {
        fontSize: theme.fontSize.md,
        fontWeight: "bold",
    },
    textStatus: {
        fontSize: theme.fontSize.sm,
        fontWeight: "bold",
    },
    green: {
        color: theme.colors.greenLight,
    },
    red: {
        color: theme.colors.red,
    },
    manageButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: "12@ms",
        justifyContent: "center",
        paddingHorizontal: theme.padding.md,
        paddingVertical: theme.padding.xxs,
    },
    manageText: {
        color: theme.colors.white,
        fontSize: theme.fontSize.sm,
    },
});

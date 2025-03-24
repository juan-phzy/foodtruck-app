import { View, Text, Image } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import theme from "@/assets/theme";

export default function AchievementSection() {
    return (
        <View style={{ flex: 1, padding: theme.padding.sm }}>
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: theme.fontSize.lg,
                    textAlign: "center",
                }}
            >
                Achievements
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                    source={require("@/assets/images/achievements.png")}
                    style={{
                        width: ms(60),
                        height: ms(60),
                        resizeMode: "contain",
                    }}
                />
                <View style={{ flex: 1, paddingHorizontal: theme.padding.xs }}>
                    <Text
                        style={{
                            fontSize: theme.fontSize.sm,
                            fontWeight: "bold",
                        }}
                    >
                        Title
                    </Text>
                    <Text style={{ fontSize: theme.fontSize.xs }}>
                        Description
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                width: "86%",
                                height: ms(10),
                                backgroundColor: theme.colors.gray,
                                paddingHorizontal: theme.padding.xxs,
                                borderRadius: ms(8),
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: "50%",
                                    height: ms(5),
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: ms(8),
                                }}
                            ></View>
                        </View>
                        <Text
                            style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                            }}
                        >
                            100%
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

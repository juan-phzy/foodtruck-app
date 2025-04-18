import theme from "@/assets/theme";
import icon from "@/assets/images/icon.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import SmallIconButton from "@/components/buttons/SmallIconButton";
import SideBySideRow from "@/components/rows/SideBySideRow";
import { router, useLocalSearchParams } from "expo-router";

/* 
    For future implementation to pass in picture and name of food truck.
    For now, generic truck icon and name is shown
*/
interface ManageTruckProps {
    truckName: string;
    image: string;
}

export default function ManageTruckScreen() {
    const { truckID } = useLocalSearchParams();
    const insets = useSafeAreaInsets();

    const [isOpen, setIsOpen] = useState(false);
    const [useLiveLocation, setUseLiveLocation] = useState(false);

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.goBack}
                    onPress={router.back}
                >
                    <View style={styles.arrowButton}>
                        <MaterialCommunityIcons
                            name="arrow-left"
                            style={styles.arrowIcon}
                        />
                    </View>
                    <Text style={styles.goBackText}>Go Back</Text>
                </TouchableOpacity>
                <View style={styles.truckImageAndText}>
                    <Image source={icon} style={styles.truckLogo} />
                    <Text style={styles.truckTitle}>{truckID}</Text>
                </View>
            </View>
            {/* 
                Created a side by side row component (holds a left and right component with a divider bar below it).
                I suggest we use this as a standard component going forward because the figma shows it in many different places. 
                I also created a new vendor component sub-folder, where the SidebySideRow component is located.
             */}
            <View>
                <SideBySideRow
                    leftComponent={
                        <SmallIconButton
                            iconName="chart-bar"
                            text="View Insights"
                            fontSize={ms(theme.fontSize.lg)}
                        />
                    }
                    rightComponent={
                        <SmallIconButton
                            iconName="menu"
                            text="Edit Menu"
                            fontSize={ms(theme.fontSize.lg)}
                        />
                    }
                />
            </View>
            <View>
                <SideBySideRow
                    leftComponent={
                        <Text style={styles.settingText}>Open/Close</Text>
                    }
                    rightComponent={
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.settingValue}>
                                {isOpen ? "Open" : "Closed"}
                            </Text>
                            <Switch
                                value={isOpen}
                                onValueChange={setIsOpen}
                                trackColor={{
                                    false: theme.colors.gray,
                                    true: theme.colors.primary,
                                }}
                                thumbColor={theme.colors.white}
                                style={styles.switchStyle}
                            />
                        </View>
                    }
                />
            </View>
            <View>
                <SideBySideRow
                    leftComponent={
                        <Text style={styles.settingText}>
                            Use Live Location
                        </Text>
                    }
                    rightComponent={
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.settingValue}>
                                {useLiveLocation ? "On" : "Off "}
                            </Text>
                            <Switch
                                value={useLiveLocation}
                                onValueChange={setUseLiveLocation}
                                trackColor={{
                                    false: theme.colors.gray,
                                    true: theme.colors.primary,
                                }}
                                thumbColor={theme.colors.white}
                                style={styles.switchStyle}
                            />
                        </View>
                    }
                />
            </View>
            <View>
                <SideBySideRow
                    leftComponent={
                        <Text
                            style={[
                                styles.settingText,
                                {
                                    color: !useLiveLocation
                                        ? theme.colors.black
                                        : theme.colors.gray,
                                },
                            ]}
                        >
                            Set Location
                        </Text>
                    }
                    rightComponent={
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            disabled={useLiveLocation}
                        >
                            <Text
                                style={[
                                    styles.settingValue,
                                    {
                                        color: !useLiveLocation
                                            ? theme.colors.black
                                            : theme.colors.gray,
                                    },
                                ]}
                            >
                                123 Main Street
                            </Text>
                            <MaterialCommunityIcons
                                name="pencil"
                                style={styles.iconFontSize}
                                color={
                                    !useLiveLocation
                                        ? theme.colors.black
                                        : theme.colors.gray
                                }
                            />
                        </TouchableOpacity>
                    }
                />
            </View>
            <View>
                <SideBySideRow
                    leftComponent={
                        <Text style={styles.settingText}>Set Schedule</Text>
                    }
                    rightComponent={
                        <TouchableOpacity
                            onPress={() => console.log("Set Schedule Pressed")}
                        >
                            <MaterialCommunityIcons
                                name="menu-right"
                                style={styles.iconFontSize}
                            />
                        </TouchableOpacity>
                    }
                />
            </View>
            <View>
                <SideBySideRow
                    leftComponent={
                        <Text style={styles.settingText}>
                            Set Unique Images
                        </Text>
                    }
                    rightComponent={
                        <TouchableOpacity
                            onPress={() =>
                                console.log("Set Unique Images Pressed")
                            }
                        >
                            <MaterialCommunityIcons
                                name="menu-right"
                                style={styles.iconFontSize}
                            />
                        </TouchableOpacity>
                    }
                />
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: "20@ms",
    },
    header: {
        marginTop: "5@ms",
    },
    goBack: {
        flexDirection: "row",
        gap: "10@ms",
        alignItems: "center",
    },
    arrowButton: {
        borderRadius: "20@ms",
        width: "35@ms",
        height: "35@ms",
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    arrowIcon: {
        fontSize: theme.fontSize.xxl,
        color: theme.colors.white,
    },
    goBackText: {
        fontSize: theme.fontSize.lg,
    },
    truckImageAndText: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10@ms",
    },
    truckLogo: {
        width: "125@ms",
        height: "125@ms",
    },
    truckTitle: {
        fontSize: theme.fontSize.xxl,
        fontWeight: "bold",
    },
    settingText: {
        fontSize: "15@ms",
        fontWeight: "bold",
    },
    settingValue: {
        fontSize: "15@ms",
        fontWeight: "bold",
        marginRight: "10@ms",
    },
    switchStyle: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    iconFontSize: {
        fontSize: ms(theme.fontSize.xxl),
    },
});

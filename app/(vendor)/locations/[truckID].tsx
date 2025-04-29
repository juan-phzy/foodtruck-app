import theme from "@/assets/theme";
import icon from "@/assets/images/icon.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import SmallIconButton from "@/components/buttons/SmallIconButton";
import SideBySideRow from "@/components/rows/SideBySideRow";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import ScheduleModal from "@/components/modals/ScheduleModal";
import { ScheduleType } from "@/types";
import { convertScheduleArrayToRecord } from "@/utils/converScheduleArrayToRecord";

export default function ManageLocation() {
    const { truckID } = useLocalSearchParams();
    const insets = useSafeAreaInsets();

    const [useLiveLocation, setUseLiveLocation] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const deleteTruck = useMutation(api.trucks.deleteTruck);
    const updateScheduleMutation = useMutation(api.trucks.updateTruckSchedule);
    const updateConvexOpenStatus = useMutation(api.trucks.updateOpenStatus);
    const truck = useQuery(api.trucks.getTruckById, {
        truckId: truckID as Id<"trucks">,
    });

    const changeOpenStatus = async () => {
        try {
            await updateConvexOpenStatus({
                truckId: truckID as Id<"trucks">,
                open_status: !truck?.open_status,
            });
            console.log("Truck open status updated successfully!");
        } catch (error) {
            console.error("Error updating truck open status:", error);
        }
    };

    const [form, setForm] = useState<{
        schedule: ScheduleType;
    }>({
        schedule: {
            Sunday: { start: "09:00 AM", end: "05:00 PM", closed: true },
            Monday: { start: "09:00 AM", end: "05:00 PM", closed: true },
            Tuesday: { start: "09:00 AM", end: "05:00 PM", closed: true },
            Wednesday: { start: "09:00 AM", end: "05:00 PM", closed: true },
            Thursday: { start: "09:00 AM", end: "05:00 PM", closed: true },
            Friday: { start: "09:00 AM", end: "05:00 PM", closed: true },
            Saturday: { start: "09:00 AM", end: "05:00 PM", closed: true },
        },
    });

    useEffect(() => {
        if (truck) {
            setForm({
                schedule: convertScheduleArrayToRecord(truck.schedule),
            });
        }
    }, [truck]);

    const handleChange = (key: keyof typeof form, value: ScheduleType) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSaveSchedule = async (newSchedule: ScheduleType) => {
        try {
            await updateScheduleMutation({
                truckId: truckID as Id<"trucks">,
                schedule: Object.entries(newSchedule).map(([day, times]) => ({
                    day,
                    start_time: times.start,
                    end_time: times.end,
                    closed: times.closed,
                })),
            });
            handleChange("schedule", newSchedule); // Update local form (optional if needed)
            console.log("Schedule updated successfully!");
        } catch (error) {
            console.error("Error updating schedule:", error);
        }
    };

    const handleDeleteTruck = async () => {
        try {
            await deleteTruck({ truckId: truckID as Id<"trucks"> });
            console.log("Truck deleted successfully!");
            router.back(); // Navigate back after deletion
        } catch (error) {
            console.error("Error deleting truck:", error);
        }
    };

    if (!truck) {
        return (
            <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.goBack} onPress={router.back}>
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
                    <Text style={styles.truckTitle}>{truck.truck_name}</Text>
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
                                {truck.open_status ? "Open" : "Closed"}
                            </Text>
                            <Switch
                                value={truck.open_status}
                                onValueChange={changeOpenStatus}
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
                                {truck.location?.split(",")[0]}
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
                            onPress={() => {
                                console.log("Set Schedule Pressed");
                                setShowModal(true);
                            }}
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
                        <Text style={[styles.settingText, { color: "red" }]}>
                            DANGER
                        </Text>
                    }
                    rightComponent={
                        <TouchableOpacity
                            onPress={handleDeleteTruck}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <MaterialCommunityIcons
                                name="trash-can-outline"
                                style={[styles.iconFontSize, { color: "red" }]}
                            />
                            <Text
                                style={{
                                    fontSize: theme.fontSize.md,
                                    color: "red",
                                }}
                            >
                                Delete Truck
                            </Text>
                        </TouchableOpacity>
                    }
                />
            </View>

            {showModal && (
                <ScheduleModal
                    closeModal={() => setShowModal(false)}
                    onSave={handleSaveSchedule}
                    initialSchedule={form.schedule}
                />
            )}
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
        width: "80@ms",
        height: "80@ms",
    },
    truckTitle: {
        fontSize: theme.fontSize.xl,
        fontWeight: "bold",
    },
    settingText: {
        fontSize: theme.fontSize.sm,
        fontWeight: "bold",
    },
    settingValue: {
        fontSize: theme.fontSize.xs,
        marginRight: "5@ms",
    },
    switchStyle: {
        transform: [{ scaleX: ms(1.2) }, { scaleY: ms(1.2) }],
    },
    iconFontSize: {
        fontSize: theme.fontSize.xl,
    },
});

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StandardButton from "../buttons/StandardButton";
import { ScheduleType } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";

interface ScheduleModalProps {
    readonly closeModal: () => void;
    readonly onSave: (schedule: ScheduleType) => void;
}

const DAYS_OF_WEEK: (keyof ScheduleType)[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export default function ScheduleModal({
    closeModal,
    onSave,
}: ScheduleModalProps) {
    const insets = useSafeAreaInsets();

    const [showPicker, setShowPicker] = useState(false);
    const [pickerDay, setPickerDay] = useState<keyof ScheduleType | null>(null);
    const [pickerField, setPickerField] = useState<"start" | "end" | null>(
        null
    );

    const [schedule, setSchedule] = useState<ScheduleType>(
        () =>
            Object.fromEntries(
                DAYS_OF_WEEK.map((day) => [
                    day,
                    { start: "09:00 AM", end: "05:00 PM", closed: true },
                ])
            ) as ScheduleType
    );

    const toggleClosed = (day: keyof ScheduleType) => {
        setSchedule((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                closed: !prev[day].closed,
            },
        }));
    };

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalCard}>
                <View style={styles.header}>
                    <Text style={styles.title}>Set Schedule</Text>
                    <MaterialCommunityIcons
                        name="close"
                        size={30}
                        color={theme.colors.primary}
                        onPress={closeModal}
                    />
                </View>

                <View style={styles.body}>
                    {DAYS_OF_WEEK.map((day: keyof ScheduleType) => (
                        <View style={styles.row} key={day}>
                            <Text style={styles.dayName}>{day}</Text>

                            <View
                                style={[
                                    styles.timePickerContainer,
                                    schedule[day].closed && { opacity: 0.5 },
                                ]}
                            >
                                <TouchableOpacity
                                    style={styles.dateButton}
                                    onPress={() => {
                                        schedule[day].closed =
                                            !schedule[day].closed;
                                        setPickerDay(day);
                                        setPickerField("start");
                                        setShowPicker(true);
                                    }}
                                >
                                    <Text style={styles.text}>
                                        {schedule[day].start}
                                    </Text>
                                </TouchableOpacity>

                                <View style={styles.line} />

                                <TouchableOpacity
                                    style={styles.dateButton}
                                    onPress={() => {
                                        setPickerDay(day);
                                        setPickerField("end");
                                        setShowPicker(true);
                                    }}
                                >
                                    <Text style={styles.text}>
                                        {schedule[day].end}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.dateButton,
                                    schedule[day].closed && {
                                        backgroundColor: theme.colors.primary,
                                    },
                                ]}
                                onPress={() => toggleClosed(day)}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        { color: theme.colors.grayDark },
                                        schedule[day].closed && {
                                            color: theme.colors.white,
                                        },
                                    ]}
                                >
                                    Closed
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <StandardButton
                        text="Save Schedule"
                        onPress={() => {
                            onSave(schedule);
                            closeModal();
                        }}
                        fontSize={theme.fontSize.md}
                        style="dark"
                    />
                    {showPicker && pickerDay && pickerField && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            display="spinner" // or "default" or "clock"
                            onChange={(event, selectedDate) => {
                                setShowPicker(false);

                                if (selectedDate && pickerDay && pickerField) {
                                    const hours = selectedDate.getHours();
                                    const minutes = selectedDate.getMinutes();

                                    // Convert to AM/PM format
                                    const ampm = hours >= 12 ? "PM" : "AM";
                                    const adjustedHours = hours % 12 || 12;
                                    const formattedTime = `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;

                                    setSchedule((prev) => ({
                                        ...prev,
                                        [pickerDay]: {
                                            ...prev[pickerDay],
                                            [pickerField]: formattedTime,
                                        },
                                    }));
                                }
                            }}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.primaryLight,
        zIndex: 1000,
        // padding: theme.padding.xxs,
    },
    modalCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        padding: theme.padding.sm,
        margin: theme.padding.sm,
        boxShadow: "0 0px 10px 5px rgba(0, 0, 0, 0.1)",
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: theme.padding.sm,
    },
    title: {
        fontSize: theme.fontSize.lg,
        fontWeight: "bold",
    },
    body: {
        flex: 1,
        justifyContent: "center",
        gap: theme.padding.sm,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: theme.colors.grayLight,
        paddingVertical: theme.padding.sm,
    },
    dayName: {
        flex: 1,
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
    },
    timePickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
    },
    dateButton: {
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xxs,
        borderColor: theme.colors.primary,
        borderRadius: theme.radius.md,
        borderWidth: 2,
    },
    line: {
        flex: 1,
        height: 2,
        maxWidth: "5%",
        backgroundColor: theme.colors.primary,
    },
});

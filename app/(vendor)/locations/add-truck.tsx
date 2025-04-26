import React, { useState } from "react";
import { Text, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import StandardButton from "@/components/buttons/StandardButton";
import EditInfoInput from "@/components/inputs/EditInfoInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import EditInfoCard from "@/components/cards/EditInfoCard";
import ScheduleModal from "@/components/modals/ScheduleModal";
import { ScheduleType } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useBusinessStore } from "@/store/useBusinessStore";
import { showToast } from "@/utils/showToast";

export default function AddTruckPage() {
    const insets = useSafeAreaInsets();

    const router = useRouter();

    const { business } = useBusinessStore();

    const [showModal, setShowModal] = useState(false);

    const createTruck = useMutation(api.trucks.createTruck);

    const [form, setForm] = useState<{
        truck_name: string;
        truck_type: string;
        location: string;
        show_business_name: boolean;
        schedule: ScheduleType;
    }>({
        truck_name: "",
        truck_type: "",
        location: "",
        show_business_name: true,
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

    const handleChange = (
        key: keyof typeof form,
        value: string | boolean | ScheduleType
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        console.log("Submitting form:", form);
        try {
            if (!form.truck_name || !form.truck_type || !form.location || !form.schedule) {
                showToast({
                    type: "error",
                    title: "Missing Fields",
                    message: "Please fill out all required fields.",
                })
                return;
            }
    
            await createTruck({
                truck_name: form.truck_name,
                truck_type: form.truck_type as "Stationary" | "Mobile",
                location: form.location,
                business_clerk_id: business!.clerkId,
                business_convex_id: business!._id,
                schedule: Object.entries(form.schedule).map(([day, values]) => ({
                    day,
                    start_time: values.start,
                    end_time: values.end,
                    closed: values.closed,
                })),
            });
            showToast({
                type: "success",
                title: "Truck Created",
                message: "Your new truck has been successfully added.",
            })
            router.back();
        } catch (error) {
            console.error("Error creating truck:", error);
            showToast({
                type: "error",
                title: "Creation Failed",
                message: "An error occurred while creating the truck.",
            });
        }
    };   

    return (
        <View
            style={[styles.rootContainer, { paddingTop: insets.top + ms(25) }]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Create Truck</Text>
                <MaterialCommunityIcons
                    name="close"
                    size={ms(32)}
                    color={theme.colors.primary}
                    onPress={router.back}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <EditInfoInput
                    title="Truck Name"
                    value={form.truck_name}
                    placeholder="Enter Truck Name"
                    onChangeText={(text) => handleChange("truck_name", text)}
                    keyboardType="default"
                />
                <EditInfoInput
                    title="Truck Type"
                    value={form.truck_type}
                    placeholder="Stationary or Mobile"
                    onChangeText={(text) => handleChange("truck_type", text)}
                    keyboardType="default"
                />
                <EditInfoInput
                    title="Location"
                    value={form.location}
                    placeholder="Enter Address"
                    onChangeText={(text) => handleChange("location", text)}
                    keyboardType="default"
                />
                <ToggleInput
                    title="Show Business Name"
                    value={form.show_business_name}
                    onToggle={(value) =>
                        handleChange("show_business_name", value)
                    }
                />
                <EditInfoCard
                    title="Schedule"
                    text="Modify your truck's schedule"
                    onPress={() => setShowModal(true)}
                />

                <StandardButton
                    text="Create Truck"
                    onPress={handleSubmit}
                    style="dark"
                    fontSize={theme.fontSize.md}
                />
            </ScrollView>
            {showModal && (
                <ScheduleModal
                    closeModal={() => setShowModal(false)}
                    onSave={(newSchedule) =>
                        handleChange("schedule", newSchedule)
                    }
                />
            )}
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryLight,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: theme.padding.sm,
        paddingHorizontal: theme.padding.sm,
    },
    title: {
        fontSize: theme.fontSize.xxl,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    scrollView: {
        paddingVertical: theme.padding.md,
        paddingHorizontal: theme.padding.sm,
        gap: theme.padding.sm,
    },
});

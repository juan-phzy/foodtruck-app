import React, { useState } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import StandardButton from "@/components/buttons/StandardButton";
import EditInfoInput from "@/components/inputs/EditInfoInput";
// import ToggleInput from "@/components/inputs/ToggleInput";
import EditInfoCard from "@/components/cards/EditInfoCard";
import ScheduleModal from "@/components/modals/ScheduleModal";
import { ScheduleType } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useBusinessStore } from "@/store/useBusinessStore";
import { showToast } from "@/utils/showToast";
import { Id } from "@/convex/_generated/dataModel";

export default function AddTruckPage() {
    const insets = useSafeAreaInsets();

    const router = useRouter();

    const { business } = useBusinessStore();

    const [showModal, setShowModal] = useState(false);

    const createTruck = useMutation(api.trucks.createTruck);

    const [selectedMenu, setSelectedMenu] = useState<string>("No Menu Selected");
    const [showMenuOptions, setShowMenuOptions] = useState(false);

    const menus = useQuery(
        api.menus.getMenusByBusiness,
        business
            ? {
                  business_id: business?._id,
              }
            : "skip"
    );

    const [form, setForm] = useState<{
        truck_name: string;
        truck_type: string;
        location: string;
        latitude: number | undefined;
        longitude: number | undefined;
        menu_id: Id<"menus">;
        show_business_name: boolean;
        schedule: ScheduleType;
    }>({
        truck_name: "",
        truck_type: "",
        location: "",
        latitude: undefined,
        longitude: undefined,
        menu_id: "" as Id<"menus">,
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
            if (
                !form.truck_name ||
                !form.truck_type ||
                !form.location ||
                !form.schedule
            ) {
                showToast({
                    type: "error",
                    title: "Missing Fields",
                    message: "Please fill out all required fields.",
                });
                return;
            }
            if (
                form.truck_type !== "Stationary" &&
                form.truck_type !== "Mobile"
            ) {
                showToast({
                    type: "error",
                    title: "Invalid Truck Type",
                    message:
                        "Truck type must be either 'Stationary' or 'Mobile'.",
                });
                return;
            }

            await createTruck({
                truck_name: form.truck_name,
                truck_type: form.truck_type,
                location: form.location,
                latitude: form.latitude,
                longitude: form.longitude,
                menu_id: form.menu_id,
                business_clerk_id: business!.clerkId,
                business_convex_id: business!._id,
                schedule: Object.entries(form.schedule).map(
                    ([day, values]) => ({
                        day,
                        start_time: values.start,
                        end_time: values.end,
                        closed: values.closed,
                    })
                ),
            });
            showToast({
                type: "success",
                title: "Truck Created",
                message: "Your new truck has been successfully added.",
            });
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
                    onChange={(text) => handleChange("truck_name", text)}
                    keyboardType="default"
                />
                <EditInfoInput
                    title="Truck Type"
                    value={form.truck_type}
                    placeholder="Stationary or Mobile"
                    onChange={(text) => handleChange("truck_type", text)}
                    keyboardType="default"
                />
                <EditInfoInput
                    title="Location"
                    value={form.location}
                    placeholder="Enter Address"
                    keyboardType="default"
                    isAddressInput
                    onChange={(address, coords) => {
                        handleChange("location", address);
                        if (coords) {
                            setForm((prev) => ({
                                ...prev,
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                            }));
                        }
                    }}
                />

                {/* <ToggleInput
                    title="Show Business Name"
                    value={form.show_business_name}
                    onToggle={(value) =>
                        handleChange("show_business_name", value)
                    }
                /> */}
                <EditInfoCard
                    title="Schedule"
                    text="Modify your truck's schedule"
                    onPress={() => setShowModal(true)}
                />

                <View style={styles.inputRootContainer}>
                    <View style={styles.inputSection1}>
                        <View style={styles.inputTextContainer}>
                            <Text
                                style={styles.inputTitle}
                            >{`Select a Menu`}</Text>
                            <Text style={styles.inputText}>{selectedMenu}</Text>
                        </View>
                        <MaterialCommunityIcons
                            style={styles.inputIcon}
                            name="chevron-down"
                            onPress={() => {
                                setShowMenuOptions((prev) => !prev);
                            }}
                        />
                    </View>
                    {showMenuOptions && (
                        <View style={styles.inputSection2}>
                            {menus?.map((menu) => (
                                <TouchableOpacity key={menu._id} onPress={() => {
                                    setSelectedMenu(menu.name);
                                    handleChange("menu_id", menu._id);
                                    setShowMenuOptions(false);
                                    console.log(JSON.stringify(form, null, 2));
                                }}>
                                    <Text>{menu?.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

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
        backgroundColor: theme.colors.primaryExtraLight,
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
    // -----------------
    inputRootContainer: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xs,
        borderRadius: theme.radius.md,
        borderColor: theme.colors.gray,
        borderWidth: 0.5,
        boxShadow: "0 0px 10px 0px rgba(0, 0, 0, 0.1)",
        gap: "10@ms"
    },
    inputSection1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputTextContainer: {
        gap: theme.padding.xxs,
    },
    inputTitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.black,
        fontWeight: "bold",
    },
    inputText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.grayDark,
    },
    inputIcon: {
        fontSize: theme.fontSize.xl,
        color: theme.colors.black,
    },
    inputSection2: {
        backgroundColor: theme.colors.grayLight,
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.xs,
    },
});

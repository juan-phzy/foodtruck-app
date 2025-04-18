import theme from "@/assets/theme";
import { useLocalSearchParams, router } from "expo-router";
import { useUserStore } from "@/store/useUserStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardTypeOptions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import EditInfoInput from "@/components/inputs/EditInfoInput";
import StandardButton from "@/components/buttons/StandardButton";
import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatDobInput } from "@/utils/helperFunctions";

export default function EditProfileSubsection() {
    console.log("");
    console.log(
        "______________________________________________________________________"
    );
    console.log(
        "(public)/profile/settings/edit/[subsection].tsx: Entered Edit Profile Page Subsection"
    );

    const { subsection } = useLocalSearchParams();
    const { currentUser } = useUserStore();
    const insets = useSafeAreaInsets();
    const updateDOB = useMutation(api.users.updateDOB);

    const { user } = useUser();
    const [firstName, setFirstName] = useState(currentUser?.first_name ?? "");
    const [lastName, setLastName] = useState(currentUser?.last_name ?? "");
    const [dob, setDob] = useState(currentUser?.dob ?? "");
    const [city, setCity] = useState(currentUser?.primary_city ?? "");

    let title, data;
    switch (subsection) {
        case "name":
            title = "Name";
            data = [
                {
                    title: "First Name",
                    value: firstName,
                    keyboardType: "default" as KeyboardTypeOptions,
                    onChangeText: setFirstName,
                },
                {
                    title: "Last Name",
                    value: lastName,
                    keyboardType: "default" as KeyboardTypeOptions,
                    onChangeText: setLastName,
                },
            ];
            break;
        case "dob":
            title = "Date of Birth";
            data = [
                {
                    title: "Date of Birth",
                    value: dob,
                    keyboardType: "numeric" as KeyboardTypeOptions,
                    onChangeText: (text: string) =>
                        setDob(formatDobInput(text)),
                },
            ];
            break;
        case "city":
            title = "Primary City";
            data = [
                {
                    title: "Primary City",
                    value: city,
                    keyboardType: "default" as KeyboardTypeOptions,
                    onChangeText: setCity,
                },
            ];
            break;
    }

    const handleSaveChanges = async () => {
        try {
            if (!user) throw new Error("User not found");

            if (subsection === "name") {
                await user.update({ firstName, lastName });
            } else if (subsection === "dob") {
                console.log("Updating DOB:", dob);
                await updateDOB({
                    clerkId: user.id,
                    dob,
                });
            } else if (subsection === "city") {
                console.log("Updating City:", city);
            }

            console.log("Profile updated successfully");

            router.back();
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                locations={[0.02, 0.12]}
            />

            {/* Header with Back Button and Title */}
            <View style={styles.header}>
                {/* Gradient Background */}

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={router.back}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={ms(20)}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{`Edit ${title}`}</Text>
            </View>

            {/* Body Container */}
            <View style={styles.bodyContainer}>
                {data?.map((item) => {
                    return (
                        <EditInfoInput
                            key={item.title}
                            title={item.title}
                            value={item.value}
                            keyboardType={item.keyboardType}
                            onChangeText={item.onChangeText}
                        />
                    );
                })}
                <StandardButton
                    style="dark"
                    text="Save Changes"
                    fontSize={theme.fontSize.md}
                    onPress={() => {
                        console.log("Save Changes Pressed");
                        handleSaveChanges();
                    }}
                />
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "5@ms",
        paddingHorizontal: theme.padding.sm,
        paddingTop: theme.padding.xxxxl,
        paddingBottom: theme.padding.lg,
        borderColor: theme.colors.grayInactive,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: theme.padding.xxs,
        position: "relative",
        backgroundColor: theme.colors.primary,
        borderRadius: "30@ms",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        flex: 1,
        fontSize: theme.fontSize.xl,
        color: theme.colors.primary,
        fontWeight: "bold",
    },
    bodyContainer: {
        flex: 1,
        paddingHorizontal: theme.padding.sm,
        paddingVertical: theme.padding.lg,
        gap: "15@ms",
    },
});

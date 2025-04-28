// React Imports
import { useState } from "react";

// React Native Imports
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardTypeOptions,
} from "react-native";

// Expo Imports
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// Styling & Theme Imports
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

// Custom Component Imports
import EditInfoInput from "@/components/inputs/EditInfoInput";
import StandardButton from "@/components/buttons/StandardButton";

// Convex, Clerk, and Function Imports
import { useUserStore } from "@/store/useUserStore";
import { useUser } from "@clerk/clerk-expo";
import { formatDobInput } from "@/utils/helperFunctions";

// Config
import { USER_SETTINGS_CONFIG } from "@/constants";
import { useSettingsHandlers } from "@/lib/userSettings/handlers";

export default function EditProfileSubsection() {
    const { subsection, section } = useLocalSearchParams();
    const sectionKey = Array.isArray(section) ? section[0] : section;
    const subKey = Array.isArray(subsection) ? subsection[0] : subsection;
    const insets = useSafeAreaInsets();

    const { currentUser } = useUserStore();
    const { user } = useUser();

    if (!sectionKey || !subKey || !(sectionKey in USER_SETTINGS_CONFIG)) {
        throw new Error("Invalid section or subsection");
    }

    const sectionConfig =
        USER_SETTINGS_CONFIG[sectionKey as keyof typeof USER_SETTINGS_CONFIG];
    const fieldConfig = sectionConfig.fields.find((f) => f.link === subKey);
    if (!fieldConfig) throw new Error("Invalid subsection field");

    const [form, setForm] = useState(
        fieldConfig.inputs.reduce(
            (acc, input) => {
                acc[input.key] = "";
                return acc;
            },
            {} as Record<string, string>
        )
    );

    const [verifyingPhone, setVerifyingPhone] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationId, setVerificationId] = useState<string | null>(null);
    const [verifyingEmail, setVerifyingEmail] = useState(false);
    const [emailVerificationCode, setEmailVerificationCode] = useState("");
    const [emailVerificationId, setEmailVerificationId] = useState<
        string | null
    >(null);

    const handleInputChange = (key: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: subKey === "dob" ? formatDobInput(value) : value,
        }));
    };

    const handlers = useSettingsHandlers({
        verifyingPhone,
        setVerifyingPhone,
        verificationCode,
        setVerificationCode,
        verificationId,
        setVerificationId,
        verifyingEmail,
        setVerifyingEmail,
        emailVerificationCode,
        setEmailVerificationCode,
        emailVerificationId,
        setEmailVerificationId,
    });

    const handleSaveChanges = async () => {
        try {
            if (!user) throw new Error("User not found");

            const sectionHandlers =
                handlers[sectionKey as keyof typeof handlers];
            const handler = sectionHandlers?.[subKey];

            if (typeof handler === "function") {
                const shouldProceed = await handler(user, form);
                if (shouldProceed !== false) router.back();
            } else {
                console.warn("No handler for:", sectionKey, subKey);
            }
        } catch (err) {
            console.error("Error saving changes:", err);
        }
    };

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                locations={[0.02, 0.12]}
            />

            <View style={styles.header}>
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
                <Text style={styles.title}>{`Edit ${fieldConfig.label}`}</Text>
            </View>

            <View style={styles.bodyContainer}>
                {fieldConfig.inputs.map((input) => (
                    <EditInfoInput
                        key={input.key}
                        title={input.title}
                        value={form[input.key]}
                        keyboardType={input.keyboardType as KeyboardTypeOptions}
                        placeholder={(() => {
                            switch (input.key) {
                                case "password":
                                    return "Enter New Password";
                                case "current_password":
                                    return "Enter Current Password";
                                default:
                                    return (
                                        currentUser![
                                            input.key as keyof typeof currentUser
                                        ] ?? ""
                                    );
                            }
                        })()}
                        onChange={(text) => handleInputChange(input.key, text)}
                    />
                ))}

                {verifyingPhone && (
                    <EditInfoInput
                        title="Verification Code"
                        value={verificationCode}
                        keyboardType="numeric"
                        placeholder="Enter verification code"
                        onChange={setVerificationCode}
                    />
                )}
                {verifyingEmail && (
                    <EditInfoInput
                        title="Verification Code"
                        value={emailVerificationCode}
                        keyboardType="numeric"
                        placeholder="Enter verification code"
                        onChange={setEmailVerificationCode}
                    />
                )}

                <StandardButton
                    style="dark"
                    text="Save Changes"
                    fontSize={theme.fontSize.md}
                    onPress={handleSaveChanges}
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

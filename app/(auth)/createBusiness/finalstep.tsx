// React & Hooks
import { useState } from "react";

// React Native Components
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Pressable,
    Dimensions,
    ScrollView,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

// Custom Components
import TextInputFancy from "@/components/inputs/TextInputFancy";
import StandardButton from "@/components/buttons/StandardButton";

// Theme & Constants
import theme from "@/assets/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";

const { height } = Dimensions.get("window");

export default function CreateAccountScreen() {
    console.log("");
    console.log("__________________________________________________");
    console.log("app/(auth)/create.tsx: Entered CreateAccountScreen");

    const insets = useSafeAreaInsets(); // Safe area insets for top and bottom padding
    const { isLoaded, signUp, setActive } = useSignUp(); // Clerk sign-up hook for user authentication
    const [isLoading, setIsLoading] = useState(false); // Loading state for the sign-up process
    const router = useRouter(); // Router for navigation

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
    });

    // Updates form state when an input field changes.
    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    // Navigates the user back to the previous screen.
    const handleGoBack = () => {
        console.log("Go Back Pressed From Create Account");
        router.back();
    };

    // Handles user sign-up action
    const handleSignUp = async () => {
        if (!isLoaded || !signUp) return;

        setIsLoading(true);

        try {
            const { email, password, first_name, last_name, phone_number } =
                form;

            const result = await signUp.create({
                emailAddress: email,
                password,
                firstName: first_name,
                lastName: last_name,
                phoneNumber: phone_number,
                unsafeMetadata: {
                    role: "vendor", // Temporary role assignment
                    // In a production environment, roles should be managed securely with public or private metadata.
                },
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });

                router.replace("/(vendor)/locations/");
            } else {
                console.warn(
                    "Signup not complete. Verification might be required."
                );
                console.log(JSON.stringify(result, null, 2));
            }
        } catch (err) {
            console.error("Sign-up error:", JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Main Container
        <View style={styles.rootContainer}>
            {/* Background Image with Overlay */}
            <ImageBackground
                source={require("@/assets/images/sign-in-bg.jpg")}
                style={styles.background}
                imageStyle={{ resizeMode: "cover" }}
            >
                {/* Gradient Overlay for Background */}
                <LinearGradient
                    style={styles.gradient}
                    colors={[
                        "rgba(255, 132, 0, 1)", // Orange (Primary Theme Color)
                        "rgba(91, 47, 0, 0.90)", // Dark Orange
                        "rgba(0, 0, 0, 1)", // Black
                    ]}
                    locations={[0, 0.5, 0.9]}
                />

                {/* Logo Header Section */}
                <View
                    style={[styles.logoContainer, { paddingTop: insets.top }]}
                >
                    <Text style={styles.title}>MunchMap</Text>
                    <Text style={styles.subtitle}>For Business: Step 1 of 5</Text>
                </View>

                {/* Form Container using BlurView */}
                <BlurView
                    intensity={8}
                    style={[
                        styles.bodyContainer,
                        { paddingBottom: insets.bottom + ms(20) },
                    ]}
                >
                    {/* Go Back Button */}
                    <Pressable
                        style={styles.goBackContainer}
                        onPress={handleGoBack}
                    >
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={ms(24)}
                            color={theme.colors.white}
                        />
                        <Text style={styles.goBackText}>Go Back</Text>
                    </Pressable>

                    {/* Form Header */}
                    <Text style={styles.formHeader}>Personal Information</Text>

                    {/* User Input Form */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.formContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TextInputFancy
                            label="First Name"
                            placeholder="Enter your first name"
                            onChangeText={(value) =>
                                handleInputChange("first_name", value)
                            }
                        />
                        <TextInputFancy
                            label="Last Name"
                            placeholder="Enter your last name"
                            onChangeText={(value) =>
                                handleInputChange("last_name", value)
                            }
                        />
                    </ScrollView>

                    {/* Sign Up Button */}
                    <StandardButton
                        style="light"
                        verticalPadding={theme.padding.sm}
                        fontSize={theme.fontSize.md}
                        text={isLoading ? "Signing Up..." : "Sign Up"}
                        onPress={handleSignUp}
                        disabled={isLoading}
                    />
                </BlurView>
            </ImageBackground>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    safeArea: {
        flex: 1,
        justifyContent: "flex-start",
    },
    logoContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: theme.fontSize.xxxxl,
        color: theme.colors.white,
    },
    subtitle: {
        fontSize: theme.fontSize.lg,
        color: theme.colors.white,
    },
    bodyContainer: {
        paddingHorizontal: theme.padding.xl,
        paddingVertical: theme.padding.xl,
        maxHeight: height * 0.85,
        width: "100%",
        gap: "15@ms",
        borderTopLeftRadius: "40@s",
        borderTopRightRadius: "40@s",
        boxShadow: "0px -10px 25px 10px rgba(255, 132, 0, .7)",
        overflow: "hidden",
    },
    goBackContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms",
    },
    goBackText: {
        color: theme.colors.white,
        fontSize: theme.fontSize.md,
    },
    formHeader: {
        fontSize: theme.fontSize.lg,
        color: theme.colors.white,
        fontWeight: "bold",
    },
    formContainer: {
        gap: "10@ms",
        paddingBottom: theme.padding.lg,
    },
});

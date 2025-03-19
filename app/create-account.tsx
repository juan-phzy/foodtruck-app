// React & Hooks
import React, { useState } from "react";

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
import { Ionicons } from "@expo/vector-icons"; // For "Go Back" icon
import { router } from "expo-router";

// Custom Components
import CustomTextInput from "@/components/inputs/TextInputFancy";
import ButtonStandard from "@/components/buttons/ButtonStandard";

// Theme & Constants
import theme from "@/assets/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/context/ctx";

// Get screen dimensions for responsive UI scaling
const { width } = Dimensions.get("window");

/**
 * CreateAccountScreen Component
 *
 * This screen provides a user-friendly interface for account creation.
 *
 * Features:
 * - Background image with gradient overlay.
 * - A form with text input fields for user details.
 * - A sign-up button that triggers the authentication process.
 * - A go-back button to navigate to the previous screen.
 * - Responsive design for different screen sizes.
 */
export default function CreateAccountScreen() {
    // Form State
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        dob: "",
        primary_city: "",
        password: "",
    });

    const { signIn } = useSession();
    const [isLoading, setIsLoading] = useState(false); // Loading state

    /**
     * Updates form state when an input field changes.
     */
    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    /**
     * Navigates the user back to the previous screen.
     */
    const handleGoBack = () => {
        console.log("Go Back Pressed From Create Account");
        router.back();
    };

    /**
     * Handles user sign-up action using Amplify Auth.
     */
    const handleSignUp = async () => {
        console.log("Sign Up Pressed");
        setIsLoading(true); // Set loading state
        setTimeout(() => {
            setIsLoading(false);
            signIn(); // Simulated sign-in
            router.replace("/"); // Redirect to home screen
        }, 2000); // Simulated loading
    };

    return (
        // Main Container
        <View style={styles.container}>
            {/* Background Image with Overlay */}
            <ImageBackground
                source={require("@/assets/images/sign-in-bg.jpg")}
                style={styles.background}
                imageStyle={{ resizeMode: "cover" }}
            >
                <SafeAreaView style={styles.safeArea}>
                    {/* Gradient Overlay for Background */}
                    <LinearGradient
                        colors={[
                            "rgba(255, 132, 0, 1)", // Orange (Primary Theme Color)
                            "rgba(122, 63, 0, 0.85)", // Dark Orange
                            "rgba(0, 0, 0, 1)", // Black
                        ]}
                        locations={[0, 0.3, 0.95]}
                        style={styles.gradient}
                    />

                    {/* Main Content */}
                    <View style={styles.content}>
                        {/* App Title Section */}
                        <View style={styles.logoContainer}>
                            <Text style={styles.title}>MunchMap</Text>
                            <Text style={styles.subtitle}>
                                Find Nearby Food Trucks
                            </Text>
                        </View>

                        {/* Form Container with Shadow Effect */}
                        <View style={styles.shadowContainer}>
                            {/* Blurred Background for Form */}
                            <BlurView
                                intensity={8}
                                style={styles.bodyContainer}
                            >
                                {/* Gradient Overlay on Form */}
                                <LinearGradient
                                    colors={[
                                        "rgba(210, 210, 210, 0.2)",
                                        "rgba(0, 0, 0, 0)",
                                    ]}
                                    locations={[0.5, 1]}
                                    style={styles.gradient}
                                />

                                {/* Go Back Button */}
                                <Pressable
                                    style={styles.goBackContainer}
                                    onPress={handleGoBack}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={24}
                                        color="white"
                                    />
                                    <Text style={styles.goBackText}>
                                        Go Back
                                    </Text>
                                </Pressable>

                                {/* Form Header */}
                                <Text style={styles.formHeader}>
                                    Account Information
                                </Text>

                                {/* User Input Form */}
                                <ScrollView
                                    style={styles.scrollFormContainer}
                                    contentContainerStyle={styles.formContainer}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    <CustomTextInput
                                        label="First Name"
                                        placeholder="Enter your first name"
                                        onChangeText={(value) =>
                                            handleInputChange(
                                                "first_name",
                                                value
                                            )
                                        }
                                    />
                                    <CustomTextInput
                                        label="Last Name"
                                        placeholder="Enter your last name"
                                        onChangeText={(value) =>
                                            handleInputChange(
                                                "last_name",
                                                value
                                            )
                                        }
                                    />
                                    <CustomTextInput
                                        label="Email"
                                        placeholder="Enter your email"
                                        onChangeText={(value) =>
                                            handleInputChange("email", value)
                                        }
                                        keyboardType="email-address"
                                    />
                                    <CustomTextInput
                                        label="Phone Number"
                                        placeholder="Enter your phone number"
                                        onChangeText={(value) =>
                                            handleInputChange(
                                                "phone_number",
                                                value
                                            )
                                        }
                                        keyboardType="phone-pad"
                                    />
                                    <CustomTextInput
                                        label="Date of Birth"
                                        placeholder="YYYY-MM-DD"
                                        onChangeText={(value) =>
                                            handleInputChange("dob", value)
                                        }
                                    />
                                    <CustomTextInput
                                        label="Password"
                                        placeholder="Enter a strong password"
                                        onChangeText={(value) =>
                                            handleInputChange("password", value)
                                        }
                                        secureTextEntry
                                    />
                                </ScrollView>

                                {/* Sign Up Button */}
                                <ButtonStandard
                                    style="light"
                                    verticalPadding={10}
                                    fontSize={16}
                                    text={
                                        isLoading ? "Signing Up..." : "Sign Up"
                                    }
                                    onPress={handleSignUp}
                                    disabled={isLoading} // Disable button when signing up
                                />
                            </BlurView>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

/**
 * Styles for CreateAccountScreen
 */
const styles = StyleSheet.create({
    /** Main Container */
    container: {
        flex: 1,
        justifyContent: "center",
    },

    /** Background Image */
    background: {
        flex: 1,
        justifyContent: "center",
    },

    /** Overlay Gradient */
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },

    /** Safe Area View to avoid UI overlapping with system UI */
    safeArea: {
        flex: 1,
        justifyContent: "center",
        // borderColor: "red",
        // borderWidth: 4,
    },

    /** Main Content Container */
    content: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },

    /** Logo Container */
    logoContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    title: {
        fontSize: width * 0.12, // Dynamically adjusts based on screen width
        color: "white",
    },
    subtitle: {
        fontSize: width * 0.05, // Dynamically adjusts based on screen width
        color: "white",
    },

    /** Shadow Container (Under Form) */
    shadowContainer: {
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.7,
        shadowRadius: 15,
        elevation: 10,
    },

    /** Body Container with Blur Effect */
    bodyContainer: {
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 25,
        gap: 15,
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden",
    },

    /** Go Back Button */
    goBackContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingTop: 15,
        gap: 10,
    },
    goBackText: {
        color: theme.colors.white,
        fontSize: 16,
    },

    /** Form Header */
    formHeader: {
        fontSize: 20,
        color: theme.colors.white,
        fontWeight: "bold",
    },

    /** Form Input Fields */
    formContainer: {
        flexDirection: "column",
        gap: 10,
        width: "100%",
    },

    /** Scrollable Form Container to prevent UI cutoff */
    scrollFormContainer: {
        maxHeight: "100%", // Ensures scrolling only when necessary
    },
});

// React & Hooks
import React from "react";

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
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";

// Context & State Management
import { useSession } from "@/context/ctx";

// Constants & Theme
import { FORM_FIELDS } from "@/constants";
import theme from "@/theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";

// Get screen dimensions for responsive UI scaling
const { width, height } = Dimensions.get("window");

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
    const { signIn } = useSession(); // Access authentication function

    /**
     * Navigates the user back to the previous screen.
     */
    const handleGoBack = () => {
        console.log("Go Back Pressed From Create Account");
        router.back();
    };

    /**
     * Handles user sign-up action.
     */
    const handleSignUp = () => {
        console.log("Sign Up Pressed");
        signIn(); // Simulated sign-in
        router.replace("/"); // Redirect to home screen
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
                            <BlurView intensity={8} style={styles.bodyContainer}>
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

                                {/* User Input Form (Scrollable for small screens) */}
                                <ScrollView
                                    style={styles.scrollFormContainer}
                                    contentContainerStyle={styles.formContainer}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {FORM_FIELDS.map((field, index) => (
                                        <CustomTextInput
                                            key={index + field.label}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                        />
                                    ))}
                                </ScrollView>

                                {/* Sign Up Button */}
                                <CustomButton
                                    style="light"
                                    verticalPadding={10}
                                    fontSize={16}
                                    text="Sign Up"
                                    onPress={handleSignUp}
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

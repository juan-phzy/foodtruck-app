/**
 * SignIn Component
 *
 * This screen provides a user-friendly interface for signing in.
 *
 * Features:
 * - Background image with gradient overlay.
 * - Toggle between Email and Phone sign-in.
 * - Input fields for credentials.
 * - Alternative sign-in options (Email, Gmail, Phone).
 * - Navigation to Create Account screen.
 * - Fully responsive layout for different screen sizes.
 */

// React & Hooks
import React, { useState } from "react";

// React Native Components
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    Alert,
    ActivityIndicator,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

// Custom Components
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import IconButton from "@/components/IconButton";

// Context & State Management
import { useAuth } from "@/context/authContext"; // ✅ Updated to Amplify Gen 2 auth
import { SafeAreaView } from "react-native-safe-area-context";

// Theme & Styles
import theme from "@/theme/theme";

// Get screen dimensions for responsive UI scaling
const { width, height } = Dimensions.get("window");

export default function SignIn() {
    // State for toggling between Phone and Email sign-in
    const [signInOption, setSignInOption] = useState<"Phone" | "Email">(
        "Email"
    );
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth(); // ✅ Use new Amplify authentication API

    /**
     * Handles the sign-in process
     */
    const handleSignIn = async () => {
        if (!credentials.username || !credentials.password) {
            Alert.alert("Error", "Please enter your credentials.");
            return;
        }

        try {
            setLoading(true);
            await signIn(credentials.username, credentials.password);
            Alert.alert("Success", "You have signed in successfully!");
            router.replace("/"); // Redirect to home
        } catch (error) {
            console.error("Sign-in error:", error);
            Alert.alert("Sign-in Failed, An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles navigation to the Create Account screen
     */
    const handleCreateAccount = () => {
        router.push("/create-account");
    };

    /**
     * Renders the toggle button to switch between Phone and Email sign-in
     */
    const renderSignInToggle = () => {
        return signInOption === "Phone" ? (
            <IconButton
                icon={<MaterialIcons name="email" size={25} color="white" />}
                label="Email"
                iconBackground={theme.colors.primary}
                onPress={() => setSignInOption("Email")}
            />
        ) : (
            <IconButton
                icon={
                    <MaterialCommunityIcons
                        name="phone"
                        size={25}
                        color="white"
                    />
                }
                label="Phone"
                iconBackground={theme.colors.primary}
                onPress={() => setSignInOption("Phone")}
            />
        );
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
                    {/* Background Gradient Overlay */}
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
                        {/* Logo Section */}
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
                                {/* Form Gradient Overlay */}
                                <LinearGradient
                                    colors={[
                                        "rgba(210, 210, 210, 0.2)",
                                        "rgba(0, 0, 0, 0)",
                                    ]}
                                    locations={[0.5, 1]}
                                    style={styles.gradient}
                                />

                                {/* Input Form */}
                                <View style={styles.child}>
                                    <CustomTextInput
                                        label={signInOption}
                                        placeholder={
                                            signInOption === "Phone"
                                                ? "(123)-456-7890"
                                                : "muncher@email.com"
                                        }
                                        value={credentials.username}
                                        onChangeText={(text) =>
                                            setCredentials({
                                                ...credentials,
                                                username: text,
                                            })
                                        }
                                    />
                                    <CustomTextInput
                                        label="Password"
                                        placeholder="Enter your password"
                                        secureTextEntry
                                        value={credentials.password}
                                        onChangeText={(text) =>
                                            setCredentials({
                                                ...credentials,
                                                password: text,
                                            })
                                        }
                                    />
                                    <CustomButton
                                        style="light"
                                        verticalPadding={10}
                                        fontSize={16}
                                        text={
                                            loading
                                                ? "Signing In..."
                                                : "Sign In"
                                        }
                                        onPress={handleSignIn}
                                        disabled={loading}
                                    />
                                </View>

                                {loading && (
                                    <ActivityIndicator
                                        size="large"
                                        color={theme.colors.primary}
                                    />
                                )}

                                {/* Divider Line */}
                                <View style={styles.dividerContainer}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>OR</Text>
                                    <View style={styles.dividerLine} />
                                </View>

                                {/* Other Sign-In Options */}
                                <View style={styles.otherOptionsContainer}>
                                    {renderSignInToggle()}
                                    <IconButton
                                        icon={
                                            <MaterialCommunityIcons
                                                name="gmail"
                                                size={25}
                                                color="white"
                                            />
                                        }
                                        label="Gmail"
                                        iconBackground={theme.colors.primary}
                                        onPress={() =>
                                            console.log("Gmail Button Pressed")
                                        }
                                    />
                                </View>

                                {/* New User Section */}
                                <View style={styles.newUserContainer}>
                                    <Text style={styles.newUserLabel}>
                                        New User?
                                    </Text>
                                    <CustomButton
                                        style="outlineLight"
                                        verticalPadding={10}
                                        fontSize={16}
                                        text="Create Account Here"
                                        onPress={handleCreateAccount}
                                    />
                                </View>

                                {/* Switch to Vendor Login */}
                                <View style={styles.switchVendorContainer}>
                                    <Text style={styles.switchVendorText}>
                                        Switch to Vendor Login
                                    </Text>
                                </View>
                            </BlurView>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

/**
 * Styles for SignIn Screen
 */
const styles = StyleSheet.create({
    // Main Container
    container: {
        flex: 1,
        justifyContent: "center",
    },

    background: {
        flex: 1,
        justifyContent: "center",
        position: "relative",
    },

    gradient: {
        ...StyleSheet.absoluteFillObject,
    },

    safeArea: {
        flex: 1,
        position: "relative",
    },

    // Content Container
    content: {
        flex: 1,
        position: "relative",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    // Logo Container
    logoContainer: {
        width: "100%",
        position: "relative",
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

    // Shadow Container
    shadowContainer: {
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        width: "100%",
        height: "70%",

        // Shadow (iOS + Android)
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.7,
        shadowRadius: 15,
        elevation: 10,
    },

    // Body Container
    bodyContainer: {
        flexDirection: "column",
        position: "relative",
        padding: 25,
        gap: 15,
        width: "100%",
        height: "100%",

        // Borders
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden", // Clips the gradient to rounded corners
    },

    child: {
        width: "100%",
        minHeight: 20,
        flexDirection: "column",
        gap: 10,

        // Borders
        borderWidth: 0,
        borderColor: "red",
    },

    // Divider Container
    dividerContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,

        // Borders
        borderWidth: 0,
        borderColor: "red",
    },

    dividerLine: {
        flex: 1,
        height: 1,
        marginHorizontal: 10,
        backgroundColor: theme.colors.white,
    },

    dividerText: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: "medium",
    },

    // Other Options Container
    otherOptionsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
    },

    // New User View Styles
    newUserContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 10,
        width: "100%",
    },

    newUserLabel: {
        color: theme.colors.white,
        fontSize: 14,
        fontWeight: "medium",
    },

    // Switch to Vendor Login Styles
    switchVendorContainer: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.white,

        // Flexbox
        alignItems: "flex-start",

        // Spacing
        marginTop: 20,
        paddingVertical: 10,
        width: "100%",
    },

    switchVendorText: {
        color: theme.colors.white,
        fontSize: 14,
    },
});

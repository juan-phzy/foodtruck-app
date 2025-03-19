/**
 * SignIn Component
 *
 * This screen provides a user-friendly interface for signing in.
 *
 * Features:
 * - Background image with gradient overlay.
 * - Toggle between Email and Phone sign-in.
 * - Input fields for credentials.
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
    ActivityIndicator,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

// Custom Components
import TextInputFancy from "@/components/inputs/TextInputFancy";
import ButtonStandard from "@/components/buttons/ButtonStandard";

// Context & State Management
import { useSession } from "@/context/ctx";
import { SafeAreaView } from "react-native-safe-area-context";

// Theme & Styles
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";

export default function SignIn() {
   
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const { signIn } = useSession();

    /**
     * Handles the sign-in process
     */
    const handleSignIn = async () => {
        console.log("Sign In Pressed");
        setLoading(true); // Set loading state
        setTimeout(() => {
            setLoading(false);
            signIn(); // Simulated sign-in
            router.replace("/"); // Redirect to home screen
        }, 2000); // Simulated loading
    };

    /**
     * Handles navigation to the Create Account screen
     */
    const handleCreateAccount = () => {
        router.push("/create-account");
    };

    return (
        <View style={styles.rootContainer}>
            <ImageBackground
                source={require("@/assets/images/sign-in-bg.jpg")}
                style={styles.backgroundImage}
                imageStyle={{ resizeMode: "cover" }}
            >
                <SafeAreaView style={styles.safeAreaView}>
                    {/* Gradient Overlay */}
                    <LinearGradient
                        style={styles.gradient}
                        colors={[
                            "rgba(255, 132, 0, 1)", // Orange (Primary Theme Color)
                            "rgba(91, 47, 0, 0.90)", // Dark Orange
                            "rgba(0, 0, 0, 1)", // Black
                        ]}
                        locations={[0, 0.5, .9]}
                    />

                    {/* Logo Section */}
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>MunchMap</Text>
                        <Text style={styles.subtitle}>
                            Find Nearby FoodTrucks
                        </Text>
                    </View>

                    {/* Blurred Background for Form */}
                    <BlurView intensity={10} style={styles.bodyContainer}>
                        {/* Form Gradient Overlay */}
                        {/* <LinearGradient
                            style={styles.gradient}
                            colors={[
                                "rgba(210, 210, 210, 0.2)",
                                "rgba(0, 0, 0, 0)",
                            ]}
                            locations={[0.5, 1]}
                        /> */}

                        {/* Input Form */}
                        <View style={styles.signInForm}>
                            <TextInputFancy
                                label="Email"
                                placeholder="you@email.com"
                                value={credentials.username}
                                onChangeText={(text) =>
                                    setCredentials({
                                        ...credentials,
                                        username: text,
                                    })
                                }
                            />
                            <TextInputFancy
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
                            <ButtonStandard
                                style="light"
                                verticalPadding={theme.padding.xs}
                                fontSize={theme.fontSize.sm}
                                text={loading ? "Signing In..." : "Sign In"}
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

                        {/* Divider Line For Future Sign In Options */}
                        {/* <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View> */}

                        {/* New User Section */}
                        <View style={styles.newUserContainer}>
                            <Text style={styles.newUserLabel}>New User?</Text>
                            <ButtonStandard
                                style="outlineLight"
                                verticalPadding={theme.padding.xs}
                                fontSize={theme.fontSize.sm}
                                text="Create Account Here"
                                onPress={handleCreateAccount}
                            />
                        </View>

                        {/* Switch to Vendor Login */}
                        <Text style={styles.switchVendorText}>
                            Switch to Vendor Login
                        </Text>
                    </BlurView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

/**
 * Styles for SignIn Screen
 */
const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
    },
    safeAreaView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
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
        paddingVertical: theme.padding.xxxl,
        width: "100%",
        gap: "15@ms",
        borderTopLeftRadius: "40@s",
        borderTopRightRadius: "40@s",
        boxShadow: "0px -10px 25px 10px rgba(255, 132, 0, .7)",
        overflow: "hidden",
    },
    signInForm: {
        gap: "15@ms",
    },
    // DO NOT DELETE: SAVE FOR FUTURE USE
    // dividerContainer: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     paddingVertical: theme.padding.xxs,
    //     borderColor: theme.colors.white,
    //     borderWidth: 1,
    // },
    // dividerLine: {
    //     flex: 1,
    //     height: 1,
    //     backgroundColor: theme.colors.white,
    // },
    // dividerText: {
    //     color: theme.colors.white,
    //     fontSize: theme.padding.lg,
    //     fontWeight: "medium",
    //     marginHorizontal: "10@ms",
    // },
    newUserContainer: {
        gap: "5@ms",
    },
    newUserLabel: {
        color: theme.colors.white,
        fontSize: theme.fontSize.sm,
        fontWeight: "medium",
    },
    switchVendorText: {
        width: "100%",
        color: theme.colors.white,
        fontSize: theme.fontSize.xs,
        paddingVertical: theme.padding.xxs,
        borderTopWidth: 1,
        borderTopColor: theme.colors.white,
    },
});

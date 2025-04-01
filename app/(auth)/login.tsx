/**
 * SignIn Component
 *
 * This screen provides a user-friendly interface for signing in.
 */

// React & Hooks
import React, { useCallback, useState } from "react";

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
import { useRouter } from "expo-router";

// Custom Components
import TextInputFancy from "@/components/inputs/TextInputFancy";
import StandardButton from "@/components/buttons/StandardButton";

// Context & State Management
import { SafeAreaView } from "react-native-safe-area-context";

// Theme & Styles
import theme from "@/assets/theme";
import { ScaledSheet } from "react-native-size-matters";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");

    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded) return;
        setLoading(true);
        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                setLoading(false);
                router.replace("/");
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                setLoading(false);
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            setLoading(false);
            console.error(JSON.stringify(err, null, 2));
        }
    };

    /**
     * Handles navigation to the Create Account screen
     */
    const goToCreateAccount = () => {
        router.replace("/(auth)/create");
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
                        locations={[0, 0.5, 0.9]}
                    />

                    {/* Logo Section */}
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>MunchMap</Text>
                        <Text style={styles.subtitle}>
                            Find Nearby FoodTrucks
                        </Text>
                    </View>

                    {/* Blurred Body Container for Form */}
                    <BlurView intensity={10} style={styles.bodyContainer}>
                        {/* Input Form */}
                        <View style={styles.signInForm}>
                            <TextInputFancy
                                label="Email"
                                placeholder="you@email.com"
                                value={emailAddress}
                                onChangeText={(emailAddress) =>
                                    setEmailAddress(emailAddress)
                                }
                            />
                            <TextInputFancy
                                label="Password"
                                placeholder="Enter your password"
                                secureTextEntry
                                value={password}
                                onChangeText={(password) =>
                                    setPassword(password)
                                }
                            />
                            <StandardButton
                                style="light"
                                verticalPadding={theme.padding.xs}
                                fontSize={theme.fontSize.sm}
                                text={loading ? "Signing In..." : "Sign In"}
                                onPress={onSignInPress}
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
                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <StandardButton
                            style="dark"
                            verticalPadding={theme.padding.xs}
                            fontSize={theme.fontSize.sm}
                            text={
                                loading
                                    ? "Signing In..."
                                    : "Continue With Google"
                            }
                            onPress={()=>{}}
                            disabled={loading}
                            icon="logo-google"
                        />

                        {/* New User Section */}
                        <View style={styles.newUserContainer}>
                            <Text style={styles.newUserLabel}>New User?</Text>
                            <StandardButton
                                style="outlineLight"
                                verticalPadding={theme.padding.xs}
                                fontSize={theme.fontSize.sm}
                                text="Create Account Here"
                                onPress={goToCreateAccount}
                                disabled={loading}
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
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: theme.colors.white,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.white,
    },
    dividerText: {
        color: theme.colors.white,
        fontSize: theme.padding.lg,
        fontWeight: "medium",
        marginHorizontal: "10@ms",
    },
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

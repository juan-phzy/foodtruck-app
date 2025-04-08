// React & Hooks
import { useEffect, useState } from "react";

// React Native Components
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

// Custom Components
import TextInputFancy from "@/components/inputs/TextInputFancy";
import StandardButton from "@/components/buttons/StandardButton";

// Context & State Management

// Context, Theme & Styles
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";

// Clerk & Authentication
import { useSignIn } from "@clerk/clerk-expo";

export default function SignIn() {
    const insets = useSafeAreaInsets(); // Safe area insets for top and bottom padding
    const [isVendor, setIsVendor] = useState(false); // State to toggle between Vendor and Public login
    const [loading, setLoading] = useState(false); // Loading state for sign-in process, purely for UI feedback, no backend logic
    const { signIn, setActive, isLoaded } = useSignIn(); // Clerk sign-in hook to manage authentication
    const router = useRouter(); // Router for navigation between screens

    // Temporary variables for email and password inputs, default values based on user type (Vendor/Public)
    const [emailAddress, setEmailAddress] = useState(
        isVendor ? "vendor@email.com" : "public@email.com"
    );
    const [password, setPassword] = useState(isVendor ? "vendor" : "public");
    useEffect(() => {
        if (isVendor) {
            setEmailAddress("vendor@email.com");
            setPassword("vendor123");
        } else {
            setEmailAddress("public@email.com");
            setPassword("public123");
        }
    }, [isVendor]);

    // Function to handle sign-in process
    const onSignInPress = async () => {
        if (!isLoaded) return;
        setLoading(true);
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                setLoading(false);
                if (isVendor) {
                    router.replace("/(vendor)/locations/");
                } else {
                    router.replace("/(public)");
                }
            } else {
                setLoading(false);
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            setLoading(false);
            console.error(JSON.stringify(err, null, 2));
        }
    };

    // Function to navigate to the Create Account screen
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
                <View
                    style={[styles.logoContainer, { paddingTop: insets.top }]}
                >
                    <Text style={styles.title}>MunchMap</Text>
                    <Text style={styles.subtitle}>Find Nearby FoodTrucks</Text>
                </View>
                {/* Blurred Body Container for Form */}
                <BlurView
                    intensity={10}
                    style={[
                        styles.bodyContainer,
                        { paddingBottom: insets.bottom + ms(20) },
                    ]}
                >
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
                            onChangeText={(password) => setPassword(password)}
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

                    {/* Loading Indicator */}
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

                    {/* Google Sign In Button */}
                    <StandardButton
                        style="dark"
                        verticalPadding={theme.padding.xs}
                        fontSize={theme.fontSize.sm}
                        text={
                            loading ? "Signing In..." : "Continue With Google"
                        }
                        onPress={() => {}}
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

                    {/* Switch to Vendor Login Button */}
                    <TouchableOpacity
                        onPress={() => setIsVendor((prev) => !prev)}
                    >
                        <Text style={styles.switchVendorText}>
                            {isVendor
                                ? "Switch to Public Login"
                                : "Switch to Vendor Login"}
                        </Text>
                    </TouchableOpacity>
                </BlurView>
            </ImageBackground>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
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
        paddingTop: theme.padding.xxl,
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
        color: theme.colors.white,
        fontSize: theme.fontSize.xs,
        paddingVertical: theme.padding.xxs,
        borderTopWidth: 1,
        borderTopColor: theme.colors.white,
    },
});

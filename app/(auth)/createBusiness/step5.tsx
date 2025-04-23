// React Native Components
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Pressable,
    Dimensions,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Custom Components
import StandardButton from "@/components/buttons/StandardButton";
import TextInputFancy from "@/components/inputs/TextInputFancy";

// Theme & Constants
import theme from "@/assets/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";

// State Management
import Toast from "react-native-toast-message";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";

const { height } = Dimensions.get("window");

export default function CreateBusinessStep4() {
    console.log("");
    console.log("_________________________________________________");
    console.log("app/(auth)/createBusiness/step4.tsx: Entered Page");

    const { isLoaded, signUp, setActive } = useSignUp(); // Clerk sign-up hook for user authentication
    const [isLoading, setIsLoading] = useState(false); // Loading state for the sign-up process
    const [resendDisabled, setResendDisabled] = useState(false); // Loading state for the verification process
    const [verificationCode, setVerificationCode] = useState("");

    const insets = useSafeAreaInsets();
    const router = useRouter();

    const handleGoBack = () => {
        console.log("Go Back Pressed");
        router.back();
    };

    const handleVerification = async () => {
        if (!isLoaded || !signUp) return;

        // If we're verifying...
        setIsLoading(true);
        try {
            const verified = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (verified.status === "complete") {
                await setActive({ session: verified.createdSessionId });
                router.push("/createBusiness/step6");
            } else {
                Toast.show({
                    type: "error",
                    text1: "Verification Failed",
                    text2: "Check the code and try again.",
                });
            }
        } catch (err) {
            console.error("Verification error:", err);
            Toast.show({
                type: "error",
                text1: "Verification Error",
                text2: "Unable to complete verification.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const startResendTimer = () => {
        setResendDisabled(true);
        setTimeout(() => {
            setResendDisabled(false);
        }, 30000); // 30 seconds
    };

    const resendCode = async () => {
        if (!isLoaded || !signUp) return;

        try {
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            Toast.show({
                type: "success",
                text1: "Code Resent",
                text2: "Check your email for the new code.",
                text1Style: {
                    color: theme.colors.green,
                    fontSize: theme.fontSize.sm,
                },
                text2Style: {
                    color: theme.colors.black,
                    fontSize: theme.fontSize.xs,
                },
            });
            startResendTimer();
        } catch (err) {
            console.error("Resend code error:", err);
            Toast.show({
                type: "error",
                text1: "Resend Error",
                text2: "Unable to resend code.",
                text1Style: {
                    color: theme.colors.red,
                    fontSize: theme.fontSize.sm,
                },
                text2Style: {
                    color: theme.colors.black,
                    fontSize: theme.fontSize.xs,
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.rootContainer}>
            <ImageBackground
                source={require("@/assets/images/sign-in-bg.jpg")}
                style={styles.background}
                imageStyle={{ resizeMode: "cover" }}
            >
                <LinearGradient
                    style={styles.gradient}
                    colors={[
                        "rgba(255, 132, 0, 1)",
                        "rgba(91, 47, 0, 0.90)",
                        "rgba(0, 0, 0, 1)",
                    ]}
                    locations={[0, 0.5, 0.9]}
                />

                <View
                    style={[styles.logoContainer, { paddingTop: insets.top }]}
                >
                    <Text style={styles.title}>MunchMap</Text>
                    <Text style={styles.subtitle}>Create Account</Text>
                </View>

                <BlurView
                    intensity={8}
                    style={[
                        styles.bodyContainer,
                        { paddingBottom: insets.bottom + ms(20) },
                    ]}
                >
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

                    <Text style={styles.formHeader}>Verify Email</Text>

                    <TextInputFancy
                        label="Verification Code"
                        placeholder="Enter code from email"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        keyboardType="numeric"
                        maxLength={6}
                    />

                    <StandardButton
                        style="outlineLight"
                        verticalPadding={theme.padding.sm}
                        fontSize={theme.fontSize.md}
                        text={
                            resendDisabled
                                ? "Wait Before Requesting Another Code"
                                : "Resend Code"
                        }
                        onPress={resendCode}
                        disabled={resendDisabled}
                    />

                    <StandardButton
                        style="light"
                        verticalPadding={theme.padding.sm}
                        fontSize={theme.fontSize.md}
                        text={"Verify Code"}
                        onPress={handleVerification}
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

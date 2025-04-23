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
import { useRouter } from "expo-router";

// Custom Components
import StandardButton from "@/components/buttons/StandardButton";
import TextWithLabel from "@/components/cards/TextWithLabel";

// Theme & Constants
import theme from "@/assets/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";

// State Management
import { useVendorOnboardingStore } from "@/store/useVendorOnboardingStore";
import Toast from "react-native-toast-message";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";

const { height } = Dimensions.get("window");

export default function CreateBusinessStep4() {
    console.log("");
    console.log("_________________________________________________");
    console.log("app/(auth)/createBusiness/step4.tsx: Entered Page");

    const { isLoaded, signUp } = useSignUp(); // Clerk sign-up hook for user authentication
    const [isLoading, setIsLoading] = useState(false); // Loading state for the sign-up process

    const insets = useSafeAreaInsets();
    const router = useRouter();

    const { data } = useVendorOnboardingStore();

    const handleGoBack = () => {
        console.log("Go Back Pressed");
        router.back();
    };

    // Handles user sign-up action
    const handleSignUp = async () => {
        if (!isLoaded || !signUp) return;

        setIsLoading(true);

        try {
            const result = await signUp.create({
                emailAddress: data.email,
                password: data.password,
                firstName: data.first_name,
                lastName: data.last_name,
                phoneNumber: data.phone_number,
                unsafeMetadata: {
                    role: "vendor",
                },
            });

            // Check if email needs verification
            const needsEmailVerification =
                result.unverifiedFields.includes("email_address");

            if (
                result.status === "missing_requirements" &&
                needsEmailVerification
            ) {
                await signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                });

                setIsLoading(false);
                router.push("/createBusiness/step5");
                return;
            }
        } catch (err) {
            console.error("Sign-up error:", JSON.stringify(err, null, 2));
            Toast.show({
                type: "error",
                text1: "Sign-up Error",
                text2: "Please try again or check your input.",
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

                    <Text style={styles.formHeader}>Review Account</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.formContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TextWithLabel
                            label="First Name"
                            value={data.first_name}
                        />
                        <TextWithLabel
                            label="Last Name"
                            value={data.last_name}
                        />
                        <TextWithLabel label="Email" value={data.email} />
                        <TextWithLabel
                            label="Phone"
                            value={data.phone_number}
                        />
                    </ScrollView>

                    <StandardButton
                        style="light"
                        verticalPadding={theme.padding.sm}
                        fontSize={theme.fontSize.md}
                        text={"Create Account"}
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

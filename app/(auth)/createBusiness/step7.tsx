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

// State Management & Backend
import { useVendorOnboardingStore } from "@/store/useVendorOnboardingStore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const { height } = Dimensions.get("window");

export default function Step7() {
    console.log("");
    console.log("_________________________________________________");
    console.log("app/(auth)/createBusiness/step7.tsx: Entered Page");

    const { data, updateField } = useVendorOnboardingStore();

    const insets = useSafeAreaInsets();
    const router = useRouter();
    const updateBusinessInfo = useMutation(api.businesses.updatePublicInfo);

    const handleGoBack = () => {
        console.log("Go Back Pressed");
        router.back();
    };

    const saveBusinessInfo = async () => {
        console.log("Saving Business Info...");
        try {
            await updateBusinessInfo({
                clerkId: data.business_id!,
                description: data.description,
                phone_number: data.business_phone_number,
                email_link: data.business_email,
            });
            console.log("Business Info Saved Successfully!");
            router.push("/createBusiness/step8");
        } catch (error) {
            console.error("Error saving business info:", error);
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
                    <Text style={styles.subtitle}>Register Business</Text>
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

                    <Text style={styles.formHeader}>Public Business Info</Text>

                    <TextInputFancy
                        label="Add Description"
                        placeholder="Business Description"
                        value={data.description}
                        onChangeText={(text) => {
                            updateField("description", text);
                        }}
                        keyboardType="default"
                    />

                    <TextInputFancy
                        label="Business Phone Number"
                        placeholder="(555) 555-5555"
                        value={data.business_phone_number}
                        onChangeText={(text) => {
                            updateField("business_phone_number", text);
                        }}
                        keyboardType="default"
                    />

                    <TextInputFancy
                        label="Business Email"
                        placeholder="customerservice@email.com"
                        value={data.business_email}
                        onChangeText={(text) => {
                            updateField("business_email", text);
                        }}
                        keyboardType="default"
                    />

                    <StandardButton
                        style="light"
                        verticalPadding={theme.padding.sm}
                        fontSize={theme.fontSize.md}
                        text={"Next Step"}
                        onPress={saveBusinessInfo}
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

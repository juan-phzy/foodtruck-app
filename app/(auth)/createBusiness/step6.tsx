// React Native Components
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
} from "react-native";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

// Custom Components
import StandardButton from "@/components/buttons/StandardButton";
import TextInputFancy from "@/components/inputs/TextInputFancy";

// Theme & Constants
import theme from "@/assets/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";

// State Management & Backend
import Toast from "react-native-toast-message";
import { useClerk } from "@clerk/clerk-expo";
import { useVendorOnboardingStore } from "@/store/useVendorOnboardingStore";

const { height } = Dimensions.get("window");

export default function CreateBusinessStep4() {
    console.log("");
    console.log("_________________________________________________");
    console.log("app/(auth)/createBusiness/step4.tsx: Entered Page");

    const { data, updateField } = useVendorOnboardingStore();

    const insets = useSafeAreaInsets();
    const router = useRouter();

    const clerk = useClerk();

    const createOrganization = async () => {
        if (!data.business_name) {
            Toast.show({
                type: "error",
                text1: "Business Name Required",
                text2: "Please enter your business name before continuing.",
                text1Style: {
                    color: theme.colors.red,
                    fontSize: theme.fontSize.sm,
                },
                text2Style: {
                    color: theme.colors.black,
                    fontSize: theme.fontSize.xxs,
                },
            });
            return;
        }

        try {
            const organization = await clerk.createOrganization({
                name: data.business_name,
                slug: data.business_name.toLowerCase().replace(/\s+/g, "-"), // simple transformation
            });

            updateField("business_id", organization.id);
            console.log("Created organization:", organization);

            router.push("/(auth)/createBusiness/step7");
        } catch (err) {
            console.error("Error creating organization:", err);
            Toast.show({
                type: "error",
                text1: "Failed to create business",
                text2: "Something went wrong. Please try again.",
                text1Style: {
                    color: theme.colors.red,
                    fontSize: theme.fontSize.sm,
                },
                text2Style: {
                    color: theme.colors.black,
                    fontSize: theme.fontSize.xxs,
                },
            });
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
                    <Text style={styles.formHeader}>Add Business Name</Text>

                    <TextInputFancy
                        label="Doing Business As (DBA)"
                        placeholder="Enter Legal Business Name"
                        required={true}
                        value={data.business_name}
                        onChangeText={(text) => {
                            updateField("business_name", text);
                        }}
                        keyboardType="default"
                    />

                    <StandardButton
                        style="light"
                        verticalPadding={theme.padding.sm}
                        fontSize={theme.fontSize.md}
                        text={"Next Step"}
                        onPress={createOrganization}
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

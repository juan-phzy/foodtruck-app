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
import TextInputFancy from "@/components/inputs/TextInputFancy";
import StandardButton from "@/components/buttons/StandardButton";

// Theme & Constants
import theme from "@/assets/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";

// Vendor Store
import { useUserOnboardingStore } from "@/store/useUserOnboardingStore";
import Toast from "react-native-toast-message";

const { height } = Dimensions.get("window");

export default function CreateUserStep1() {
    console.log("");
    console.log("_____________________________________________");
    console.log("app/(auth)/createUser/step1.tsx: Entered Page");

    const insets = useSafeAreaInsets();
    const router = useRouter();

    const { data, updateField } = useUserOnboardingStore();

    const handleGoBack = () => {
        console.log("Go Back Pressed");
        router.back();
    };

    const handleNextStep = () => {
        if (!data.first_name || !data.last_name) {
            Toast.show({
                visibilityTime: 10000,
                type: "error",
                text1: "Missing Information",
                text2: "Please enter both first and last name",
                text1Style: {
                    color: theme.colors.red,
                    fontSize: theme.fontSize.sm,
                },
                text2Style: {
                    color: theme.colors.black,
                    fontSize: theme.fontSize.xs,
                },
            });
            return;
        }

        router.push("/(auth)/createUser/step2");
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
                    <Text style={styles.subtitle}>
                        Create Account
                    </Text>
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

                    <Text style={styles.formHeader}>Personal Information</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.formContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TextInputFancy
                            label="First Name"
                            required={true}
                            placeholder="Enter your first name"
                            value={data.first_name}
                            onChangeText={(value) =>
                                updateField("first_name", value)
                            }
                        />
                        <TextInputFancy
                            label="Last Name"
                            required={true}
                            placeholder="Enter your last name"
                            value={data.last_name}
                            onChangeText={(value) =>
                                updateField("last_name", value)
                            }
                        />
                    </ScrollView>

                    <StandardButton
                        style="light"
                        verticalPadding={theme.padding.sm}
                        fontSize={theme.fontSize.md}
                        text={"Next Step"}
                        onPress={handleNextStep}
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

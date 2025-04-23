// React Native Components
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Pressable,
    Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// Expo Libraries
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Custom Components
import StandardButton from "@/components/buttons/StandardButton";

// Theme & Constants
import theme from "@/assets/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { CATEGORIES } from "@/constants";

// State Management & Backend
import Toast from "react-native-toast-message";
import { useVendorOnboardingStore } from "@/store/useVendorOnboardingStore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const { height } = Dimensions.get("window");

export default function Step8() {
    console.log("");
    console.log("_________________________________________________");
    console.log("app/(auth)/createBusiness/step8.tsx: Entered Page");

    const { data, updateField } = useVendorOnboardingStore();

    const insets = useSafeAreaInsets();
    const router = useRouter();

    const updateCategories = useMutation(api.businesses.updateCategories);

    const handleGoBack = () => {
        console.log("Go Back Pressed");
        router.back();
    };

    const saveBusinessCategories = async () => {
        console.log("Saving Business Info...");
        try {
            await updateCategories({
                clerkId: data.business_id!,
                categories: data.categories,
            });
            console.log("Business Info Saved Successfully!");
            router.push("/createBusiness/step9");
        } catch (error) {
            console.error("Error saving business info:", error);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Failed to save business info.",
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

                    <Text style={styles.formHeader}>Your Categories</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.formContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        {CATEGORIES.map((category) => (
                            <Pressable
                                key={category.name}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderColor: theme.colors.white,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingHorizontal: theme.padding.sm,
                                    paddingVertical: theme.padding.xs,
                                    gap: theme.padding.sm,
                                }}
                                onPress={() => {
                                    const updatedCategories =
                                        data.categories || [];

                                    if (
                                        updatedCategories.includes(
                                            category.name
                                        )
                                    ) {
                                        // Remove category
                                        updateField(
                                            "categories",
                                            updatedCategories.filter(
                                                (c) => c !== category.name
                                            )
                                        );
                                    } else {
                                        // Add category
                                        updateField("categories", [
                                            ...updatedCategories,
                                            category.name,
                                        ]);
                                    }
                                }}
                            >
                                <MaterialCommunityIcons
                                    name={
                                        data.categories?.includes(category.name)
                                            ? "check-circle"
                                            : "circle-outline"
                                    }
                                    size={ms(15)}
                                    color={theme.colors.primary}
                                />
                                <Text
                                    style={{
                                        fontSize: theme.fontSize.sm,
                                        color: theme.colors.white,
                                    }}
                                >
                                    {category.name}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>

                    <StandardButton
                        style="light"
                        verticalPadding={theme.padding.sm}
                        fontSize={theme.fontSize.md}
                        text={"Next Step"}
                        onPress={saveBusinessCategories}
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
        maxHeight: height * 0.7,
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

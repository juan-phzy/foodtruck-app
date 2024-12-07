import React from "react";
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import theme from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons"; // For "Go Back" icon
import { router } from "expo-router";
import { useSession } from "@/context/ctx";

export default function CreateAccountScreen() {

    const { signIn } = useSession();

    return (
        // Main Container
        <View style={styles.container}>
            {/* MAIN CONTAINER IMAGE BG START */}
            <ImageBackground
                source={require("@/assets/images/sign-in-bg.jpg")}
                style={styles.background}
                imageStyle={{ resizeMode: "cover" }}
            >
                {/* BG GRADIENT START - POSITION ABSOLUTE */}
                <LinearGradient
                    colors={[
                        "rgba(255, 132, 0, 1)", // Orange, Primary Theme Color
                        "rgba(122, 63, 0, 0.85)", // Orange/Black
                        "rgba(0, 0, 0, 1)", // Black
                    ]}
                    locations={[0, 0.3, 0.95]}
                    style={styles.gradient}
                />
                {/* BG GRADIENT END */}

                {/* CONTENT CONTAINER START */}
                <View style={styles.content}>
                    {/* LOGO CONTAINER START */}
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>MunchMap</Text>
                        <Text style={styles.subtitle}>
                            Find Nearby Food Trucks
                        </Text>
                    </View>
                    {/* LOGO CONTAINER END */}

                    {/* Shadow Container */}
                    <View style={styles.shadowContainer}>
                        {/* BlurView for Background */}
                        <BlurView intensity={8} style={styles.bodyContainer}>
                            {/* BODY CONTAINER BG GRADIENT START */}
                            <LinearGradient
                                colors={[
                                    "rgba(210, 210, 210, 0.2)",
                                    "rgba(0, 0, 0, 0)",
                                ]}
                                locations={[0.5, 1]}
                                style={styles.gradient}
                            />
                            {/* BODY CONTAINER BG GRADIENT END */}

                            {/* GO BACK BUTTON */}
                            <Pressable
                                style={styles.goBackContainer}
                                onPress={() => {
                                    console.log("Go Back Pressed From Create Account Step 1");
                                    router.back()
                                }}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color="white"
                                />
                                <Text style={styles.goBackText}>Go Back</Text>
                            </Pressable>

                            {/* FORM HEADER */}
                            <Text style={styles.formHeader}>
                                Account Information
                            </Text>

                            {/* FORM START */}
                            <View style={styles.formContainer}>
                                <CustomTextInput
                                    label="First Name"
                                    placeholder="Enter your first name"
                                />
                                <CustomTextInput
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                />
                                <CustomTextInput
                                    label="Date of Birth"
                                    placeholder="mm/dd/yyyy"
                                />
                                <CustomTextInput
                                    label="Email"
                                    placeholder="muncher@email.come"
                                />
                                <CustomTextInput
                                    label="Confirm Email"
                                    placeholder="muncher@email.com"
                                />
                                <CustomTextInput
                                    label="Phone Number"
                                    placeholder="(123)-456-7890"
                                />
                                <CustomButton
                                    style="light"
                                    verticalPadding={10}
                                    fontSize={16}
                                    text="Sign Up"
                                    onPress={() => {
                                        console.log("Sign Up Pressed");
                                        signIn();
                                        router.replace("/");
                                    }}
                                />
                            </View>
                            {/* FORM END */}
                        </BlurView>
                    </View>
                </View>
                {/* CONTENT CONTAINER END */}
            </ImageBackground>
            {/* MAIN CONTAINER IMAGE BG END */}
        </View>
        // Main Container End
    );
}

const styles = StyleSheet.create({
    // Main Container
    container: {
        flex: 1,
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
    },
    background: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },

    // Content Container
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 20,
    },

    // Logo Container
    logoContainer: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    title: {
        fontSize: 64,
        color: "white",
    },
    subtitle: {
        fontSize: 16,
        color: "white",
    },

    // Shadow Container
    shadowContainer: {
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%",
        height: 700,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.7,
        shadowRadius: 15,
        elevation: 10,
    },

    // Body Container
    bodyContainer: {
        flexDirection: "column",
        padding: 25,
        gap: 15,
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden",
    },

    // Go Back Container
    goBackContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingVertical: 15,
        gap: 10,
        borderColor: "white",
        borderWidth: 0,
    },
    goBackText: {
        color: theme.colors.white,
        fontSize: 16,
    },

    // Form Header
    formHeader: {
        fontSize: 20,
        color: theme.colors.white,
        fontWeight: "bold",
    },

    // Form Container
    formContainer: {
        flexDirection: "column",
        gap: 10,
        width: "100%",
    },
});

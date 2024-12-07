import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import theme from "@/theme/theme";
import IconButton from "@/components/IconButton";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useSession } from "@/context/ctx";
import { router } from "expo-router";

export default function SignIn() {
    const [signInOption, setSignInOption] = useState<"Phone" | "Email">(
        "Phone"
    ); // Toggle between sign-in options

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
                {/* BG GRADIENT START - POSITION ABSOLUTE*/}
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

                            {/* INPUT FORM START */}
                            <View style={styles.child}>
                                <CustomTextInput
                                    label={signInOption}
                                    placeholder={
                                        signInOption != "Email"
                                            ? "(123)-456-7890"
                                            : "muncher@email.com"
                                    }
                                />
                                <CustomTextInput
                                    label="Password"
                                    placeholder="Enter your password"
                                />
                                <CustomButton
                                    style="light"
                                    verticalPadding={10}
                                    fontSize={16}
                                    text="Sign In"
                                    onPress={() => {
                                        console.log("Sign In Button Pressed");
                                        signIn();
                                        router.replace("/");
                                    }}
                                />
                            </View>
                            {/* INPUT FORM END */}

                            {/* DIVIDER LINE START */}
                            <View style={styles.dividerContainer}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>OR</Text>
                                <View style={styles.dividerLine} />
                            </View>
                            {/* DIVIDER LINE END */}

                            {/* OTHER SIGN-IN OPTIONS */}
                            <View style={styles.otherOptionsContainer}>
                                {signInOption === "Email" ? (
                                    <IconButton
                                        icon={
                                            <MaterialIcons
                                                name="email"
                                                size={25}
                                                color="white"
                                            />
                                        }
                                        label="Email"
                                        iconBackground={theme.colors.primary}
                                        onPress={() => setSignInOption("Phone")}
                                    />
                                ) : (
                                    <IconButton
                                        icon={
                                            <MaterialCommunityIcons
                                                name="phone"
                                                size={25}
                                                color="white"
                                            />
                                        }
                                        label="Phone"
                                        iconBackground={theme.colors.primary}
                                        onPress={() => setSignInOption("Email")}
                                    />
                                )}
                                <IconButton
                                    icon={
                                        <MaterialCommunityIcons
                                            name="gmail"
                                            size={25}
                                            color="white"
                                        />
                                    }
                                    label="Gmail"
                                    iconBackground={theme.colors.primary}
                                    onPress={() =>
                                        console.log("Gmail Button Pressed")
                                    }
                                />
                            </View>
                            {/* NEW USER SECTION */}
                            <View style={styles.newUserContainer}>
                                <Text style={styles.newUserLabel}>
                                    New User?
                                </Text>
                                <CustomButton
                                    style="outlineLight"
                                    verticalPadding={10}
                                    fontSize={16}
                                    text="Create Account Here"
                                    onPress={() =>
                                    {
                                        console.log(
                                            "Create Account Button Pressed"
                                        );
                                        router.push("/create-account"); // Navigate to the CreateAccountScreen
                                    }
                                    }
                                />
                            </View>

                            {/* SWITCH TO VENDOR */}
                            <View style={styles.switchVendorContainer}>
                                <Text style={styles.switchVendorText}>
                                    Switch to Vendor Login
                                </Text>
                            </View>
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
        // Size and Positioning
        flex: 1,
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
    },
    background: {
        // Size and Positioning
        flex: 1,
        position: "relative",
        justifyContent: "center",
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },

    // Content Container
    content: {
        // Flexbox
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 20,
    },

    // Logo Container
    logoContainer: {
        // Flexbox
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        // Typography
        fontSize: 64,
        color: "white",
    },
    subtitle: {
        // Typography
        fontSize: 16,
        color: "white",
    },

    // Shadow Container
    shadowContainer: {
        // Flexbox
        flexDirection: "column",
        justifyContent: "flex-end",

        // Size and Positioning
        width: "100%",
        height: 525,

        // Shadow (iOS + Android)
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.7,
        shadowRadius: 15,
        elevation: 10,
    },

    // Body Container
    bodyContainer: {
        // Flexbox
        flexDirection: "column",
        padding: 25,
        gap: 15,

        // Size and Positioning
        width: "100%",
        height: "100%",

        // Borders
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden", // Clips the gradient to rounded corners
    },
    child: {
        // Size and Positioning
        width: "100%",
        minHeight: 20,

        // Flexbox
        flexDirection: "column",
        gap: 10,

        // Borders
        borderWidth: 0,
        borderColor: "red",
    },

    // Divider Container
    dividerContainer: {
        // Size and Positioning
        width: "100%",

        // Flexbox
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,

        // Borders
        borderWidth: 0,
        borderColor: "red",
    },
    dividerLine: {
        // Size and Positioning
        flex: 1,
        height: 1,
        marginHorizontal: 10,

        // Background
        backgroundColor: theme.colors.white,
    },
    dividerText: {
        // Typography
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: "medium",
    },

    // Other Options Container
    otherOptionsContainer: {
        // Flexbox
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
    },

    // New User View Styles
    newUserContainer: {
        // Flexbox
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 10,
        width: "100%",
    },
    newUserLabel: {
        // Typography
        color: theme.colors.white,
        fontSize: 14,
        fontWeight: "medium",
    },

    // Switch to Vendor Login Styles
    switchVendorContainer: {
        // Borders
        borderTopWidth: 1,
        borderTopColor: theme.colors.white,

        // Flexbox
        alignItems: "flex-start",

        // Spacing
        marginTop: 20,
        paddingVertical: 10,
        width: "100%",
    },
    switchVendorText: {
        // Typography
        color: theme.colors.white,
        fontSize: 14,
    },
});

import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
//import { LinearGradient } from 'expo-linear-gradient';

interface ProfileHeaderProps {
    name: string;
    level: number;
    phoneNumber: string;
    email: string;
    progress: number;
}

const ProfileHeader = ({
    name,
    level,
    phoneNumber,
    email,
    progress = 0.75,
}: ProfileHeaderProps) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progress, // Animate to current progress
            duration: 500, // Smooth transition
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const borderWidth = 5;
    const size = 60;

    return (
        <View style={styles.headerContainer}>
            <View style={styles.profileInfo}>
                <View style={styles.identityContainer}>
                    {/* Circular Progress Indicator using border manipulation */}
                    <View
                        style={[
                            styles.iconContainer,
                            { width: size, height: size },
                        ]}
                    >

                        {/* Profile Picture */}
                        <View
                            style={[
                                styles.iconContainer,
                                {
                                    width: size - borderWidth * 2,
                                    height: size - borderWidth * 2,
                                },
                            ]}
                        >
                            <Text style={styles.iconLetter}>{name[0]}</Text>
                        </View>
                    </View>

                    {/* Name and Level*/}
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.levelText}>
                            Munch Level: {level}
                        </Text>
                    </View>
                </View>

                {/* Settings */}
                <View style={styles.settingsContainer}>
                    <Text style={styles.settingsText}>Settings</Text>
                    <Pressable>
                        <Ionicons name="settings" size={24} color="orange" />
                    </Pressable>
                </View>
            </View>

            {/* Contact Info */}
            <View style={styles.contactContainer}>
                <Text style={styles.labelText}>Phone Number</Text>
                <Text style={styles.infoText}>{phoneNumber}</Text>
            </View>
            <View style={styles.contactContainer}>
                <Text style={styles.labelText}>Email</Text>
                <Text style={styles.infoText}>{email}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        borderColor: "red",
        borderWidth: 2,
        padding: 10,
        gap: 10,
    },

    //Row 1
    profileInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: "auto",
        borderColor: "blue",
        borderWidth: 3,
    },
    identityContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        borderColor: "purple",
        borderWidth: 2,
    },

    //Icons
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "#944C00",
    },
    iconLetter: {
        fontSize: 32,
        color: "#FFFFFF",
    },

    //Names
    nameContainer: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: "auto",
        borderColor: "purple",
        borderWidth: 1,
    },
    nameText: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "bold",
    },

    levelText: {
        fontSize: 12,
        color: "#000000",
    },

    //Settings
    settingsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        borderColor: "orange",
        borderWidth: 1,
        paddingVertical: 10,
    },
    settingsText: {
        width: "auto",
        fontSize: 16,
        color: "#FF8400",
    },
    //Row 2 and Row 3
    contactContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },

    //Phone and Email Labels
    labelContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        width: 87,
        height: 25,
        paddingVertical: 5,
    },

    labelText: {
        fontWeight: "bold",
        fontSize: 12,
    },

    //Phone and Email Texts
    infoContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        width: 92,
        height: 25,
        paddingVertical: 5,
    },
    infoText: {
        fontSize: 12,
        color: "#000000",
    },
});

export default ProfileHeader;

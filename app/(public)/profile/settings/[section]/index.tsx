import theme from "@/assets/theme";
import EditInfoCard from "@/components/cards/EditInfoCard";
import { MERGED_SETTINGS_CONFIG } from "@/constants";
import { useUserStore } from "@/store/useUserStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";

export default function SettingsSectionIndex() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { currentUser } = useUserStore();
    const { section } = useLocalSearchParams();
    const key = Array.isArray(section) ? section[0] : section;

    const config =
        MERGED_SETTINGS_CONFIG[key as keyof typeof MERGED_SETTINGS_CONFIG];
    if (!config) throw new Error("Invalid settings section");

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            <LinearGradient
                style={styles.gradient}
                colors={["rgba(255, 132, 0, 1)", "rgba(255, 132, 0, 0)"]}
                locations={[0.02, 0.12]}
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={router.back}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={ms(20)}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{config.title}</Text>
            </View>

            {/* Body */}
            <View style={styles.bodyContainer}>
                {key === "personal" && (
                    <View style={styles.editPhotoContainer}>
                        <View style={styles.photoContainer}>
                            <Text style={styles.photoLetter}>
                                {currentUser?.first_name[0].toUpperCase()}
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.editPhotoText}>
                                Edit Profile Photo
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {config.fields.map((field) => (
                    <EditInfoCard
                        key={field.link}
                        title={field.label}
                        text={field.displayValue(currentUser!)}
                        link={`${key}/${field.link}`}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "5@ms",
        paddingHorizontal: theme.padding.sm,
        paddingTop: theme.padding.xxxxl,
        paddingBottom: theme.padding.lg,
        borderColor: theme.colors.grayInactive,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: theme.padding.xxs,
        position: "relative",
        backgroundColor: theme.colors.primary,
        borderRadius: "30@ms",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        flex: 1,
        fontSize: theme.fontSize.xl,
        color: theme.colors.primary,
        fontWeight: "bold",
    },
    bodyContainer: {
        flex: 1,
        padding: theme.padding.sm,
        gap: "15@ms",
    },
    editPhotoContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: "15@ms",
    },
    photoContainer: {
        width: "100@ms",
        height: "100@ms",
        borderRadius: "50@ms",
        backgroundColor: theme.colors.brown,
        justifyContent: "center",
        alignItems: "center",
    },
    photoLetter: {
        fontSize: theme.fontSize.xxxl,
        color: theme.colors.white,
        fontWeight: "bold",
    },
    editPhotoText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: "bold",
    },
});

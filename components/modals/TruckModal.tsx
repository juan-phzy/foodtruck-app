// React & Hooks
import { useState, useMemo, useCallback } from "react";

// State Management (Zustand)
import useTruckStore from "@/store/useTruckStore";

// Convex & Queries
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Expo Libraries
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// React Native Components
import {
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from "react-native";

// Constants & Theme
import theme from "@/assets/theme";
import { ms, ScaledSheet } from "react-native-size-matters";

// Types
import { Trucks } from "@/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

interface TruckModalProps {
    truck: Trucks;
}

const TruckModal: React.FC<TruckModalProps> = ({ truck }) => {
    const { toggleTruckModal } = useTruckStore();
    const insets = useSafeAreaInsets();

    const [isFavorite, setIsFavorite] = useState(false);
    const [showHours, setShowHours] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const toggleFavorite = useCallback(
        () => setIsFavorite((prev) => !prev),
        []
    );
    const toggleShowHours = useCallback(
        () => setShowHours((prev) => !prev),
        []
    );
    const handleRatingSubmit = useCallback(() => {
        alert(`You rated ${userRating} stars!`);
    }, [userRating]);

    // Fetch the related business
    const business = useQuery(api.businesses.getBusinessById, {
        businessId: truck.business_convex_id,
    });

    return (
        <View style={styles.truckPageContainer}>
            {/* Truck Header */}
            <View style={styles.truckPageHeader}>
                <ImageBackground
                    source={require("@/assets/images/placeholder.jpg")}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    imageStyle={{ resizeMode: "cover" }}
                >
                    <LinearGradient
                        colors={["rgba(255, 132, 0, .2)", theme.colors.primary]}
                        style={styles.gradient}
                    />

                    <View
                        style={[
                            styles.headerContent,
                            { paddingTop: insets.top + ms(16) },
                        ]}
                    >
                        <View style={styles.headerRow}>
                            {/* Back Button */}
                            <Pressable
                                style={styles.backBtnContainer}
                                onPress={toggleTruckModal}
                            >
                                <MaterialCommunityIcons
                                    name="arrow-left"
                                    size={30}
                                    color={theme.colors.white}
                                />
                            </Pressable>

                            {/* Favorite Button */}
                            <Pressable
                                style={styles.bookmarkIcon}
                                onPress={toggleFavorite}
                            >
                                <MaterialCommunityIcons
                                    name={
                                        isFavorite
                                            ? "bookmark"
                                            : "bookmark-outline"
                                    }
                                    size={30}
                                    color={theme.colors.primary}
                                />
                            </Pressable>
                        </View>

                        {/* Truck Name & Open Status */}
                        <View style={styles.headerRow}>
                            <Text style={styles.headerTitle}>
                                {truck.truck_name}
                            </Text>
                            <View
                                style={[
                                    styles.openCloseContainer,
                                    truck.open_status
                                        ? styles.open
                                        : styles.closed,
                                ]}
                            >
                                <Text style={styles.openCloseText}>
                                    {truck.open_status ? "Open" : "Closed"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.truckPageContent}>
                {/* Location */}
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Location</Text>
                    <Text style={styles.contentRowBody}>
                        {truck.location || "Location not available"}
                    </Text>
                </View>

                {/* Categories */}
                {truck.categories && (
                    <View style={styles.contentRow}>
                        <Text style={styles.contentRowTitle}>Categories</Text>
                        <Text style={styles.contentRowBody}>
                            {truck.categories.join(", ")}
                        </Text>
                    </View>
                )}

                {/* Type */}
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Type</Text>
                    <Text style={styles.contentRowBody}>
                        {truck.truck_type}
                    </Text>
                </View>

                {/* Business Hours */}
                <View style={styles.contentRow}>
                    <View style={styles.hoursTitleRow}>
                        <Text style={styles.hoursTitleText}>Hours</Text>
                        <Pressable
                            onPress={toggleShowHours}
                            style={styles.dropdownButton}
                        >
                            <MaterialCommunityIcons
                                name={showHours ? "chevron-down" : "chevron-up"}
                                size={30}
                                color={theme.colors.primary}
                            />
                        </Pressable>
                    </View>

                    {/* Today's hours */}
                    <Text style={styles.contentRowBody}>
                        {/* Find today's hours */}
                        {truck.schedule.find(
                            (d) =>
                                d.day ===
                                new Date().toLocaleString("en-US", {
                                    weekday: "long",
                                })
                        )?.closed
                            ? "Closed today"
                            : `${truck.schedule.find((d) => d.day === new Date().toLocaleString("en-US", { weekday: "long" }))?.start_time} - ${truck.schedule.find((d) => d.day === new Date().toLocaleString("en-US", { weekday: "long" }))?.end_time}`}
                    </Text>

                    {/* Expand full weekly schedule */}
                    {showHours && (
                        <View style={styles.scheduleContainer}>
                            {truck.schedule.map((entry) => (
                                <View
                                    style={styles.scheduleRow}
                                    key={entry.day}
                                >
                                    <Text>{entry.day}:</Text>
                                    {entry.closed ? (
                                        <Text>Closed</Text>
                                    ) : (
                                        <Text>
                                            {entry.start_time} -{" "}
                                            {entry.end_time}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Ratings */}
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Ratings</Text>
                    <View style={styles.contentRowBody}>
                        {/* Existing Rating */}
                        <View style={styles.ratingContainer}>
                            <Text
                                style={{
                                    marginLeft: 5,
                                    fontSize: 14,
                                    color: theme.colors.primary,
                                }}
                            >
                                {truck.rating ?? "0"}
                            </Text>
                            {Array.from({ length: 5 }, (_, index) => (
                                <MaterialCommunityIcons
                                    key={index}
                                    name={
                                        index < Math.floor(truck.rating ?? 0)
                                            ? "star"
                                            : "star-outline"
                                    }
                                    size={16}
                                    color={theme.colors.primary}
                                />
                            ))}
                            <Text style={{ fontSize: 12 }}>
                                0 {/* Placeholder for reviews */}
                            </Text>
                        </View>

                        {/* Submit New Rating */}
                        <View style={styles.starContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Pressable
                                    key={star}
                                    onPress={() => setUserRating(star)}
                                >
                                    <MaterialCommunityIcons
                                        name={
                                            star <= userRating
                                                ? "star"
                                                : "star-outline"
                                        }
                                        size={30}
                                        color={theme.colors.primary}
                                    />
                                </Pressable>
                            ))}
                        </View>
                        <Pressable
                            style={styles.submitButton}
                            onPress={handleRatingSubmit}
                        >
                            <Text style={styles.submitText}>Submit</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Contact Info */}
                {business && (
                    <View style={styles.contentRow}>
                        <Text style={styles.contentRowTitle}>Contact</Text>
                        <View style={styles.contentRowBody}>
                            {business.email_link && (
                                <Text>Email: {business.email_link}</Text>
                            )}
                            {business.phone_number && (
                                <Text>Phone: {business.phone_number}</Text>
                            )}
                            {business.website && (
                                <Text>Website: {business.website}</Text>
                            )}
                        </View>
                        <Text style={styles.contentRowTitle}>Socials</Text>
                        <View style={styles.contentRowBody}>
                            {business.instagram_link && (
                                <Text>
                                    Instagram: {business.instagram_link}
                                </Text>
                            )}
                            {business.twitter_link && (
                                <Text>Twitter: {business.twitter_link}</Text>
                            )}
                            {business.facebook_link && (
                                <Text>
                                    Facebook: {business.facebook_link}
                                </Text>
                            )}
                        </View>
                    </View>
                    
                )}
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    truckPageContainer: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: theme.colors.white,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        overflowY: "scroll",
    },
    truckPageHeader: {
        height: height * 0.3,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    headerContent: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: theme.padding.sm,
        paddingBottom: theme.padding.md,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backBtnContainer: {
        padding: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    bookmarkIcon: {
        padding: 10,
        backgroundColor: theme.colors.white,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: "bold",
        color: theme.colors.white,
    },
    openCloseContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 25,
        borderRadius: 20,
    },
    openCloseText: {
        borderRadius: 15,
        paddingHorizontal: theme.padding.xs,
        fontSize: theme.fontSize.sm,
        fontWeight: "bold",
        color: theme.colors.white,
    },
    open: {
        backgroundColor: "green",
    },
    closed: {
        backgroundColor: "red",
    },
    truckPageContent: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 10,
    },
    contentRow: {
        padding: 10,
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1,
        gap: 5,
        width: "100%",
    },
    hoursTitleRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",

        borderBottomWidth: 1,
        fontWeight: "bold",
        alignSelf: "flex-start",
    },
    hoursTitleText: {
        fontWeight: "bold",
    },
    dropdownButton: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 120,
    },
    scheduleContainer: {
        marginTop: 10,
        gap: 5,
        width: "85%",
    },
    scheduleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentRowTitle: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
    },
    contentRowBody: {
        gap: 5,
    },
    starContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        paddingVertical: 5,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    submitText: {
        color: theme.colors.white,
        fontWeight: "bold",
    },
});

export default TruckModal;

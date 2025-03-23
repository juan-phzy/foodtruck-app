/**
 * @file TruckModal.tsx
 * @description Displays detailed information about a selected food truck.
 * 
 * Features:
 * - Shows truck name, location, category, type, and operational hours.
 * - Allows toggling of business hours and bookmarking as a favorite.
 * - Displays existing user ratings and allows rating submissions.
 * - Implements memoization to optimize rendering performance.
 */

// React & Hooks
import { useState, useMemo, useCallback } from "react";

// State Management (Zustand)
import useTruckStore from "@/store/useTruckStore";

// Expo Libraries
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// React Native Components
import {
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

// Constants & Theme
import theme from '@/assets/theme';

// Types
import { FoodTruck, Hours } from "@/types";

// Component Props
interface TruckModalProps {
    truck: FoodTruck;
}

const TruckModal: React.FC<TruckModalProps> = ({ truck }) => {
    const { toggleTruckModal } = useTruckStore();

    // State Hooks
    const [isFavorite, setIsFavorite] = useState(false);
    const [showHours, setShowHours] = useState(false);
    const [userRating, setUserRating] = useState(0);

    // Helper Functions
    const toggleFavorite = useCallback(() => setIsFavorite((prev) => !prev), []);
    const toggleShowHours = useCallback(() => setShowHours((prev) => !prev), []);

    // Compute Current Day's Hours using Memoization
    const weekdays: (keyof Hours)[] = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    const weekday: keyof Hours = useMemo(() => weekdays[new Date().getDay()], []);

    // Memoized Social Media Links
    const socialLinks = useMemo(
        () =>
            Object.entries(truck.contact.social).map(([platform, handle]) => (
                <Text key={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}: {handle}
                </Text>
            )),
        [truck.contact.social]
    );

    // Handle Rating Submission
    const handleRatingSubmit = useCallback(() => {
        alert(`You rated ${userRating} stars!`);
    }, [userRating]);

    return (
        <View style={styles.truckPageContainer}>
            {/* Truck Header */}
            <View style={styles.truckPageHeader}>
                <ImageBackground
                    source={{ uri: truck.imageUrl }}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    imageStyle={{ resizeMode: "cover" }}
                >
                    <LinearGradient colors={[theme.colors.primaryLight, theme.colors.primary]} style={styles.gradient} />
                    
                    {/* Header Content */}
                    <View style={styles.headerContent}>
                        <View style={styles.headerRow}>
                            {/* Back Button */}
                            <Pressable style={styles.backBtnContainer} onPress={toggleTruckModal}>
                                <Ionicons name="arrow-back" size={30} color={theme.colors.white} />
                            </Pressable>

                            {/* Favorite Button */}
                            <Pressable style={styles.bookmarkIcon} onPress={toggleFavorite}>
                                <Ionicons name={isFavorite ? "bookmark" : "bookmark-outline"} size={30} color={theme.colors.primary} />
                            </Pressable>
                        </View>

                        {/* Truck Name & Open Status */}
                        <View style={styles.headerRow}>
                            <Text style={styles.headerTitle}>{truck.name}</Text>
                            <View style={[styles.openCloseContainer, truck.isOpen ? styles.open : styles.closed]}>
                                <Text style={styles.openCloseText}>{truck.isOpen ? "Open" : "Closed"}</Text>
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
                    <Text style={styles.contentRowBody}>{truck.location}</Text>
                </View>

                {/* Categories */}
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Categories</Text>
                    <Text style={styles.contentRowBody}>{truck.categories.join(", ")}</Text>
                </View>

                {/* Type */}
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Type</Text>
                    <Text style={styles.contentRowBody}>{truck.type}</Text>
                </View>

                {/* Business Hours */}
                <View style={styles.contentRow}>
                    <View style={styles.hoursTitleRow}>
                        <Text style={styles.hoursTitleText}>Hours</Text>
                        <Pressable onPress={toggleShowHours} style={styles.dropdownButton}>
                            <Ionicons name={showHours ? "chevron-down" : "chevron-up"} size={30} color={theme.colors.primary} />
                        </Pressable>
                    </View>
                    <Text style={styles.contentRowBody}>{`Today: ${truck.hours[weekday]}`}</Text>
                    {showHours && (
                        <View style={styles.scheduleContainer}>
                            {weekdays.map((day) => (
                                <View style={styles.scheduleRow} key={day}>
                                    <Text>{day.charAt(0).toUpperCase() + day.slice(1)}:</Text>
                                    <Text>{truck.hours[day]}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Ratings */}
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Ratings</Text>
                    <View style={styles.contentRowBody}>
                        {/* Display existing ratings */}
                        <View style={styles.ratingContainer}>
                            <Text style={{ marginLeft: 5, fontSize: 14, color: theme.colors.primary }}>
                                {truck.rating}
                            </Text>
                            {Array.from({ length: 5 }, (_, index) => (
                                <Ionicons
                                    key={index}
                                    name={index < Math.floor(truck.rating) ? "star" : "star-outline"}
                                    size={16}
                                    color={theme.colors.primary}
                                />
                            ))}
                            <Text style={{ fontSize: 12 }}>({truck.reviewCount})</Text>
                        </View>

                        {/* Interactive Rating Submission */}
                        <View style={styles.starContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Pressable key={star} onPress={() => setUserRating(star)}>
                                    <Ionicons
                                        name={star <= userRating ? "star" : "star-outline"}
                                        size={30}
                                        color={theme.colors.primary}
                                    />
                                </Pressable>
                            ))}
                        </View>
                        <Pressable style={styles.submitButton} onPress={handleRatingSubmit}>
                            <Text style={styles.submitText}>Submit</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Contact */}
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Contact</Text>
                    <View style={styles.contentRowBody}>
                        <Text>Email: {truck.contact.email}</Text>
                        {socialLinks}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
        height: 250,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    headerContent: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 60,
        paddingHorizontal: 10,
        paddingBottom: 20,
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
        fontSize: 32,
        fontWeight: "bold",
        color: theme.colors.white,
    },
    openCloseContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        borderRadius: 20,
    },
    openCloseText: {
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 16,
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

import theme from "@/theme/theme";
import { FoodTruck, Hours } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface TruckPageProps {
    closeTruckPage: () => void;
    truck: FoodTruck;
}

const TruckPage: React.FC<TruckPageProps> = ({ closeTruckPage, truck }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [showHours, setShowHours] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const today = new Date();
    const weekdays: (keyof Hours)[] = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    const weekday: keyof Hours = weekdays[today.getDay()];

    return (
        <View style={styles.truckPageContainer}>
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
                    <LinearGradient
                        colors={[
                            theme.colors.primarySuperLight,
                            theme.colors.primary,
                        ]}
                        style={styles.gradient}
                    />
                    <View style={styles.headerContent}>
                        <View style={styles.headerRow}>
                            <Pressable
                                style={styles.backBtnContainer}
                                onPress={closeTruckPage}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={30}
                                    color={theme.colors.white}
                                />
                            </Pressable>
                            <Pressable
                                style={styles.bookmarkIcon}
                                onPress={() => setIsFavorite(!isFavorite)}
                            >
                                <Ionicons
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
                        <View style={styles.headerRow}>
                            <Text style={styles.headerTitle}>{truck.name}</Text>
                            <View
                                style={[
                                    styles.openCloseContainer,
                                    truck.isOpen ? styles.open : styles.closed,
                                ]}
                            >
                                <Text style={[styles.openCloseText]}>
                                    {truck.isOpen ? "Open" : "Closed"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.truckPageContent}>
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Location</Text>
                    <Text style={styles.contentRowBody}>{truck.location}</Text>
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Categories</Text>
                    <Text style={styles.contentRowBody}>
                        {truck.categories.join(", ")}
                    </Text>
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Type</Text>
                    <Text style={styles.contentRowBody}>{truck.type}</Text>
                </View>
                <View style={styles.contentRow}>
                    <View style={styles.hoursTitleRow}>
                        <Text style={styles.hoursTitleText}>Hours</Text>
                        <Pressable
                            onPress={() => setShowHours(!showHours)}
                            style={styles.dropdownButton}
                        >
                            <Ionicons
                                name={showHours ? "chevron-down" : "chevron-up"}
                                size={30}
                                color={theme.colors.primary} // Orange color from your theme
                            />
                        </Pressable>
                    </View>

                    <Text style={styles.contentRowBody}>
                        {`Today: ${truck.hours[weekday]}`}
                    </Text>
                    {showHours && (
                        <View style={styles.scheduleContainer}>
                            {weekdays.map((day) => (
                                <View style={styles.scheduleRow} key={day}>
                                    <Text>{day.charAt(0).toUpperCase() + day.slice(1)}:{" "}</Text>
                                    <Text>{truck.hours[day]}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Ratings</Text>
                    <View style={styles.contentRowBody}>
                        {/* Your Ratings Code Goes Here */}
                    </View>
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.contentRowTitle}>Contact</Text>
                    <Text style={styles.contentRowBody}>{truck.type}</Text>
                </View>
            </View>
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
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1,
        fontWeight: "bold",
    },
    hoursTitleText: {
        fontWeight: "bold",
        borderColor: "red",
        borderWidth: 1,
    },
    dropdownButton: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        borderColor: "red",
        borderWidth: 1,
    },
    scheduleContainer:{
        marginTop: 10,
        gap: 5,
        width: "85%",
    },
    scheduleRow :{
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
        borderColor: "red",
        borderWidth: 1,
    },
});

export default TruckPage;

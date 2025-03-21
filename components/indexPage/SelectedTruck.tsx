import React, { useState, useCallback } from "react";
import {
    Text,
    View,
    Image,
    Pressable,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import theme from "@/assets/theme";
import { FoodTruck } from "@/types";

import useTruckStore from "@/store/useTruckStore";
import useMenuModalStore from "@/store/useMenuModalStore";
import { ms, ScaledSheet } from "react-native-size-matters";

interface SelectedTruckProps {
    truck: FoodTruck;
}

const SelectedTruck: React.FC<SelectedTruckProps> = ({ truck }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const { clearSelectedTruck, nextTruck, previousTruck, toggleTruckPage } =
        useTruckStore();
    const { toggleMenuModal } = useMenuModalStore();

    // Memoized function for toggling favorite state
    const handleToggleFavorite = useCallback(() => {
        setIsFavorite((prev) => !prev);
    }, []);

    // Calculate estimated driving & walking time once
    const estimatedDriveTime = Math.round(truck.distance * 3);
    const estimatedWalkTime = Math.round(truck.distance * 20);

    return (
        <BlurView intensity={10} style={styles.rootContainer}>
            {/* Title Bar */}
            <View style={styles.titleBar}>
                <Text style={styles.title}>{truck.name}</Text>

                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={clearSelectedTruck}
                >
                    <Ionicons
                        name="share-outline"
                        size={ms(17)}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={clearSelectedTruck}
                >
                    <Ionicons
                        name="close-outline"
                        size={ms(18)}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>
            </View>

            {/* Truck Info */}
            <View>
                <View style={styles.detailsRow}>
                    <View style={styles.detailsDistance}>
                        <Ionicons name="walk" size={ms(15)} />
                        <Text style={styles.detailText}>{"12 mins"}</Text>
                    </View>
                    <View style={styles.detailsDistance}>
                        <Ionicons name="bicycle" size={ms(15)} />
                        <Text style={styles.detailText}>{"7 mins"}</Text>
                    </View>
                    <View style={styles.detailsDistance}>
                        <Ionicons name="car" size={ms(15)} />
                        <Text style={styles.detailText}>{"3 mins"}</Text>
                    </View>
                </View>

                <View style={styles.detailsRow}>
                    <Text
                        style={[
                            styles.openStatus,
                            truck.isOpen ? styles.open : styles.closed,
                        ]}
                    >
                        {truck.isOpen ? "Open" : "Closed"}
                    </Text>
                    <View style={styles.stars}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Ionicons
                                key={index}
                                name={
                                    index < Math.floor(truck.rating)
                                        ? "star"
                                        : "star-outline"
                                }
                                size={12}
                                color={theme.colors.primary}
                            />
                        ))}
                    </View>{" "}
                </View>

                <Text style={styles.bolded}>{truck.categories.join(", ")}</Text>

                <Text style={styles.bolded}>Stationary Truck</Text>

                <Text style={styles.bolded}>Hours:</Text>
                <Text style={styles.detail}>9am - 9pm</Text>

                {/* Action Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleMenuModal}
                    >
                        <MaterialIcons
                            name="restaurant-menu"
                            size={20}
                            color="white"
                        />
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <MaterialCommunityIcons
                            name="directions"
                            size={20}
                            color="white"
                        />
                        <Text style={styles.buttonText}>Directions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleTruckPage}
                    >
                        <MaterialCommunityIcons
                            name="truck-outline"
                            size={20}
                            color="white"
                        />
                        <Text style={styles.buttonText}>View Truck</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleToggleFavorite}
                    >
                        <Ionicons
                            name={isFavorite ? "bookmark" : "bookmark-outline"}
                            size={ms(25)}
                            color={theme.colors.white}
                        />
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Image Gallery */}
            <View style={styles.imageGallery}>
                <FlatList
                    data={truck.images}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Navigation Buttons */}
            <View style={styles.navigationButtons}>
                <Pressable onPress={previousTruck}>
                    <Ionicons
                        name="chevron-back"
                        size={40}
                        color={theme.colors.primary}
                        style={styles.navButton}
                    />
                </Pressable>
                <Pressable onPress={nextTruck}>
                    <Ionicons
                        name="chevron-forward"
                        size={40}
                        color={theme.colors.primary}
                        style={styles.navButton}
                    />
                </Pressable>
            </View>
        </BlurView>
    );
};

const styles = ScaledSheet.create({
    rootContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: theme.padding.xs,
        paddingHorizontal: theme.padding.sm,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderTopLeftRadius: "15@ms",
        borderTopRightRadius: "15@ms",
        gap: "5@ms",
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "5@ms",
    },
    title: {
        flex: 1,
        fontWeight: "bold",
        fontSize: theme.fontSize.lg,
        color: theme.colors.primary,
    },
    backButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: "25@ms",
        width: "25@ms",
        backgroundColor: theme.colors.primary,
        borderRadius: "20@ms",
    },
    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms",
    },
    detailsDistance: {
        flexDirection: "row",
        alignItems: "center",
        gap: "2@ms",
    },
    detailText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.black,
    },
    openStatus: {
        textAlignVertical: "center",
        fontSize: theme.fontSize.sm,
        color: theme.colors.white,
        fontWeight: "bold",
        height: "25@ms",
    },
    open: {
        color: theme.colors.greenLight,
    },
    closed: {
        color: theme.colors.red,
    },
    bolded: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.black,
        fontWeight: "medium",
    },
    detail: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.black,
    },
    vert: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 12,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    stars: {
        flexDirection: "row",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "5@ms",
    },
    button: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: theme.padding.xs,
        borderRadius: 10,
        gap: 5,
    },
    buttonText: {
        color: "white",
        fontSize: theme.fontSize.xs,
        fontWeight: "bold",
    },
    imageGallery: {
        flexDirection: "row",
        marginVertical: 2,
    },
    image: {
        width: 150, // Adjust width for each image
        height: 100, // Adjust height for each image
        borderRadius: 10,
        marginRight: 10, // Add spacing between images
        resizeMode: "cover", // Ensure the image covers the area properly
    },
    navigationButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    navButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    divider: {
        height: 1,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        width: "100%",
        marginVertical: 5,
    },
});

export default SelectedTruck;

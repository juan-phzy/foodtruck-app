import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import theme from "@/theme/theme";
import { FoodTruck } from "@/types";

interface SelectedTruckCardProps {
    truck: FoodTruck;
    backFunction: () => void;
    nextTruck: () => void;
    previousTruck: () => void;
}

const SelectedTruckCard: React.FC<SelectedTruckCardProps> = ({
    truck,
    backFunction,
    previousTruck,
    nextTruck,
}) => {
    // temporary state, get from user lists later
    const [isFavorite, setIsFavorite] = useState(false);
    return (
        <BlurView intensity={10} style={styles.cardContainer}>
            {/* First View: Title Bar */}
            <View style={styles.titleBar}>
                <Pressable
                    style={styles.backButtonContainer}
                    onPress={backFunction}
                >
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color={theme.colors.white}
                    />
                </Pressable>

                <Text style={styles.title}>{truck.name}</Text>
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

                <Pressable
                    style={styles.bookmarkIcon}
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <Ionicons
                        name={isFavorite ? "bookmark" : "bookmark-outline"}
                        size={30}
                        color={theme.colors.primary}
                    />
                </Pressable>
            </View>

            {/* Second View: Information and Buttons */}
            <View style={styles.infoSection}>
                <View style={styles.categoryDistance}>
                    <Text style={styles.bolded}>
                        {truck.categories.join(", ")}
                    </Text>
                    <Text style={styles.bolded}>
                        {`${truck.distance.toFixed(2)} mi ⦁ `}
                        {`${Math.round(truck.distance * 3)} min drive ⦁ `}
                        {`${Math.round(truck.distance * 20)} min walk `}
                    </Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.bolded}>Stationary Truck</Text>

                <View style={styles.divider} />

                <View style={styles.vert}>
                    <Text style={styles.bolded}>Hours:</Text>
                    <Text style={styles.detail}>9am - 9pm</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.vert}>
                    <Text style={styles.ratingText}>Ratings</Text>
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
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.buttonRow}>
                    <Pressable style={styles.button}>
                        <MaterialIcons
                            name="restaurant-menu"
                            size={35}
                            color="white"
                        />
                        <Text style={styles.buttonText}>Menu</Text>
                    </Pressable>

                    <Pressable style={styles.button}>
                        <MaterialCommunityIcons
                            name="directions"
                            size={35}
                            color="white"
                        />
                        <Text style={styles.buttonText}>Directions</Text>
                    </Pressable>

                    <Pressable style={styles.button}>
                        <MaterialCommunityIcons
                            name="truck-outline"
                            size={35}
                            color="white"
                        />
                        <Text style={styles.buttonText}>View Truck</Text>
                    </Pressable>
                </View>

                <View style={styles.divider} />
            </View>

            {/* Third View: Image Gallery */}
            <View style={styles.imageGallery}>
                <FlatList
                    data={truck.images} // Array of image URLs from the truck
                    horizontal // Enable horizontal scrolling
                    keyExtractor={(item, index) => index.toString()} // Unique key for each image
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }} // Render each image dynamically
                            style={styles.image}
                        />
                    )}
                    showsHorizontalScrollIndicator={false} // Hide the scroll indicator for better UI
                />
            </View>

            {/* Forward and Back Buttons
                These break when tapped too fast, 
                we have to put an inactive timer 
                on them and raise the transition speed */}
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

const styles = StyleSheet.create({
    cardContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: "rgba(255, 255, 255, 0.90)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: "hidden",
        flexDirection: "column",
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5,
        marginBottom: 10,
    },
    backButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 35,
        paddingHorizontal: 15,
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.colors.primary,
        flex: 1,
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
    bookmarkIcon: {
        paddingRight: 10,
    },
    infoSection: {},
    bolded: {
        fontSize: 14,
        color: theme.colors.black,
        fontWeight: "bold",
    },
    detail: {
        fontSize: 12,
        color: theme.colors.black,
    },
    categoryDistance: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    vert: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 5,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 14,
        fontWeight: "bold",
        color: theme.colors.black,
        marginRight: 10,
    },
    stars: {
        flexDirection: "row",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        gap: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    imageGallery: {
        flexDirection: "row",
        marginVertical: 10,
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

export default SelectedTruckCard;

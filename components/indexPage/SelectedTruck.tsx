import React, { useState, useCallback } from "react";
import {
    Text,
    View,
    Image,
    Pressable,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import {
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import theme from "@/assets/theme";
import { Trucks } from "@/types";

import useTruckStore from "@/store/useTruckStore";
import useMenuModalStore from "@/store/useMenuModalStore";
import { ms, ScaledSheet } from "react-native-size-matters";

interface SelectedTruckProps {
    truck: Trucks;
}

const {width} = Dimensions.get("window");

const SelectedTruck: React.FC<SelectedTruckProps> = ({ truck }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const { clearSelectedTruck, nextTruck, previousTruck, toggleTruckModal } =
        useTruckStore();
    const { toggleMenuModal } = useMenuModalStore();

    // Memoized function for toggling favorite state
    const handleToggleFavorite = useCallback(() => {
        setIsFavorite((prev) => !prev);
    }, []);

    const renderSeparator = () => (
        <View style={{width:ms(5)}}></View>
    );

    // Calculate estimated driving & walking time once
    const estimatedDriveTime = Math.round(truck.distance! * 2);
    const estimatedBikeTime = Math.round(truck.distance! * 6);
    const estimatedWalkTime = Math.round(truck.distance! * 10);

    return (
        <BlurView intensity={10} style={styles.rootContainer}>
            {/* Title Bar */}
            <View style={styles.titleBar}>
                <Text style={styles.title}>{truck.truck_name}</Text>

                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={clearSelectedTruck}
                >
                    <MaterialCommunityIcons
                        name="share-variant"
                        size={ms(17)}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={clearSelectedTruck}
                >
                    <MaterialCommunityIcons
                        name="close"
                        size={ms(18)}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>
            </View>

            {/* Truck Info */}
            <View>
                <View style={styles.spaceBetweenRow}>
                    <View style={styles.distanceContainer}>
                        <View style={styles.detailsDistance}>
                            <MaterialCommunityIcons name="walk" size={ms(15)} />
                            <Text style={styles.detailText}>
                                {estimatedWalkTime}
                            </Text>
                        </View>
                        <View style={styles.detailsDistance}>
                            <MaterialCommunityIcons name="bicycle" size={ms(15)} />
                            <Text style={styles.detailText}>
                                {estimatedBikeTime}
                            </Text>
                        </View>
                        <View style={styles.detailsDistance}>
                            <MaterialCommunityIcons name="car" size={ms(15)} />
                            <Text style={styles.detailText}>
                                {estimatedDriveTime}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.detailsRow}>
                        <View style={styles.stars}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <MaterialCommunityIcons
                                    key={index}
                                    name={
                                        index < Math.floor(truck.rating!)
                                            ? "star"
                                            : "star-outline"
                                    }
                                    size={12}
                                    color={theme.colors.primary}
                                />
                            ))}
                        </View>
                        <Text
                            style={[
                                styles.openStatus,
                                truck.open_status ? styles.open : styles.closed,
                            ]}
                        >
                            {truck.open_status ? "Open" : "Closed"}
                        </Text>
                    </View>
                </View>
                <View style={styles.spaceBetweenRow}>
                    <Text style={styles.detailText}>Categories:</Text>
                    <Text style={styles.detailText}>
                        {truck.categories!.join(", ")}
                    </Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons
                        name="directions"
                        size={ms(17)}
                        color={theme.colors.white}
                    />
                    <Text style={styles.buttonText}>Nav</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleTruckModal}
                >
                    <MaterialCommunityIcons
                        name="truck-outline"
                        size={ms(17)}
                        color={theme.colors.white}
                    />
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleMenuModal}
                >
                    <MaterialCommunityIcons
                        name="silverware"
                        size={ms(17)}
                        color={theme.colors.white}
                    />
                    <Text style={styles.buttonText}>Menu</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleToggleFavorite}
                >
                    <MaterialCommunityIcons
                        name={isFavorite ? "bookmark" : "bookmark-outline"}
                        size={ms(17)}
                        color={theme.colors.white}
                    />
                    <Text style={styles.buttonText}>
                        {isFavorite ? "Saved" : "Save"}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Image Gallery */}
            <FlatList
                data={[0,1,2,3]}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image source={require("@/assets/images/placeholder.jpg")} style={styles.image} />
                )}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={renderSeparator}
            />

            {/* Navigation Buttons */}
            <View style={styles.navigationButtons}>
                <Pressable onPress={previousTruck}>
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={ms(35)}
                        color={theme.colors.primary}
                        style={styles.navButton}
                    />
                </Pressable>
                <Pressable onPress={nextTruck}>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={ms(35)}
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
    spaceBetweenRow: {
        flex: 1,
        height: "30@ms",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10@ms",
        borderBottomColor: theme.colors.gray,
        borderBottomWidth: 1,
    },
    distanceContainer: {
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
    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms",
    },
    stars: {
        flexDirection: "row",
    },
    openStatus: {
        textAlignVertical: "center",
        fontSize: theme.fontSize.xs,
        fontWeight: "bold",
        height: "25@ms",
    },
    open: {
        color: theme.colors.greenLight,
    },
    closed: {
        color: theme.colors.red,
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
        borderRadius: "10@ms",
        paddingVertical: "10@ms",
        gap: "2@ms",
    },
    buttonText: {
        color: "white",
        fontSize: theme.fontSize.xs,
        fontWeight: "bold",
    },
    image: {
        width: width*.4,
        height: width*.25,
        borderRadius: 10,
        resizeMode: "cover", 
    },
    navigationButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    navButton: {
        paddingHorizontal: theme.padding.sm,
    },
});

export default SelectedTruck;

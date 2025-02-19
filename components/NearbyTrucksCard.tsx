import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for the dropdown arrow
import theme from "@/theme/theme";
import CustomButton from "./CustomButton";
import { FoodTruck } from "@/types";
import TruckCardList from "./TruckCardList";

interface NearbyTrucksCardProps {
    isCategoryActive: boolean;
    isExpanded: boolean;
    onToggleExpand: () => void;
    trucks: FoodTruck[];
    showCategories: ()=>void;
}

const NearbyTrucksCard: React.FC<NearbyTrucksCardProps> = ({
    isCategoryActive,
    isExpanded,
    onToggleExpand,
    trucks,
    showCategories
}) => {

    const [ sortedByRating, setSortedByRating ] = useState(false);

    const [ sortedByDistance, setSortedByDistance ] = useState(false);

    const sortedTrucksByRating = [...trucks].sort((a, b) => b.rating - a.rating);

    const sortedTrucksByDistance = [...trucks].sort((a, b) => a.distance - b.distance);

    return (
        <BlurView
            intensity={10}
            style={[styles.card, isExpanded && styles.expanded]}
        >
            {/* First View: Title Bar */}
            <View style={styles.titleBar}>
                {/* Title Text */}
                <Text style={styles.titleText}>Nearby Food Trucks</Text>
                {/* Dropdown Arrow */}
                <Pressable
                    onPress={onToggleExpand}
                    style={styles.dropdownButton}
                >
                    <Ionicons
                        name={isExpanded ? "chevron-down" : "chevron-up"}
                        size={30}
                        color={theme.colors.primary} // Orange color from your theme
                    />
                </Pressable>
            </View>

            {/* Second View: Filter Bar */}
            <View style={styles.filterBar}>
                <Text style={{fontSize:18,fontWeight:"bold", flex:1}}>Filters:</Text>
                <CustomButton
                    style={isCategoryActive ? "dark" : "outlineDark"}
                    verticalPadding={5}
                    fontSize={12}
                    width="fit"
                    text="Category"
                    onPress={showCategories}
                />
                <CustomButton
                    style={sortedByDistance ? "dark" : "outlineDark"}
                    verticalPadding={5}
                    fontSize={12}
                    width="fit"
                    text="Distance"
                    onPress={() => {
                        console.log("Distance Button Pressed");
                        if(sortedByDistance){
                            setSortedByDistance(false);
                        } else {
                            setSortedByDistance(true);
                            setSortedByRating(false);
                        }
                    }}
                />
                <CustomButton
                    style={sortedByRating ? "dark" : "outlineDark"}
                    verticalPadding={5}
                    fontSize={12}
                    width="fit"
                    text="Rating"
                    onPress={() => {
                        console.log("Rating Button Pressed")
                        if(sortedByRating){
                            setSortedByRating(false);
                        } else {
                            setSortedByRating(true);
                            setSortedByDistance(false);
                        }
                    }}
                />
            </View>

            {/* Third View: TruckCards */}
            <TruckCardList trucks={sortedByRating ? sortedTrucksByRating : (sortedByDistance ? sortedTrucksByDistance: trucks)} />

        </BlurView>
    );
};

const styles = StyleSheet.create({
    card: {
        // Main Container Styles
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 200,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: "hidden",
        // Flexbox
        flexDirection: "column",
        gap: 10,
    },
    expanded: {
        // Adjust height when expanded
        height: 500, // Or any desired height
    },
    titleBar: {
        // First View Styles
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    titleText: {
        // Title Text Styles
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    dropdownButton: {
        // Dropdown Arrow Styles
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        // Background color is transparent by default
    },
    filterBar: {
        // Second View Styles
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: 10,
        gap: 5,
        width: "100%",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 1,
    },
});

export default NearbyTrucksCard;

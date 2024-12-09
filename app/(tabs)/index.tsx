import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import SearchBar from "@/components/SearchBar";
import NearbyTrucksCard from "@/components/NearbyTrucksCard";

import { FOOD_TRUCKS } from "@/constants";

export default function Index() {
    const [region, setRegion] = useState({
        latitude: 40.76779159578361,  // Default to NYC
        longitude: -73.98228109243095,
        latitudeDelta: 0.04, // Adjust for 5-mile radius
        longitudeDelta: 0.02,
        
    });


    const [markers, setMarkers] = useState([]); // Array of truck data
    const [isExpanded, setIsExpanded] = useState(false); // Card state

    useEffect(() => {
        // Fetch active trucks in the region when the map region changes
        // fetchTrucks(region);
    }, []);

    const fetchTrucks = async (currentRegion: any) => {
        try {
            const response = await fetch(
                `https://your-api.com/trucks?lat=${currentRegion.latitude}&lng=${currentRegion.longitude}&radius=5`
            );
            const data = await response.json();
            setMarkers(data.trucks); // Assuming API returns truck data
        } catch (error) {
            console.error("Error fetching trucks:", error);
        }
    };

    const handleSearch = (location: any) => {
        // Update map region based on searched location
        setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Map */}
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            >
                {/* {markers.map((truck) => (
          <Marker
            key={truck.id}
            coordinate={{
              latitude: truck.latitude,
              longitude: truck.longitude,
            }}
            title={truck.name}
          />
        ))} */}
            </MapView>

            {/* Truck List */}
            <NearbyTrucksCard
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(!isExpanded)}
                trucks={FOOD_TRUCKS}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

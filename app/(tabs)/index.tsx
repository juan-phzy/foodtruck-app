import { useSession } from "@/context/ctx";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import TruckListCard from "@/components/TruckListCard";
import SearchBar from "@/components/SearchBar";

export default function Index() {
    const [region, setRegion] = useState({
        latitude: 40.7128, // Default to NYC
        longitude: -74.006,
        latitudeDelta: 0.0922, // Adjust for 5-mile radius
        longitudeDelta: 0.0421,
    });

    const { signOut } = useSession();

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
            <TruckListCard
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(!isExpanded)}
                trucks={markers}
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

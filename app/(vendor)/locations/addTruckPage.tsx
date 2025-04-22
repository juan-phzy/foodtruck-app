import React, { useState } from "react";
import { Text, TextInput, Switch, Button, ScrollView } from "react-native";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTruckPage() {
    const createTruck = useMutation(api.trucks.createTruck);

    const [truckName, setTruckName] = useState("");
    const [vendorId, setVendorId] = useState(""); // Replace this with actual vendor ID from auth/store
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [truckType, setTruckType] = useState("Stationary");
    const [openStatus, setOpenStatus] = useState(true);
    const [scheduleDays, setScheduleDays] = useState("Mon,Tue"); // comma-separated
    const [scheduleTimes, setScheduleTimes] = useState("9AM-5PM"); // comma-separated

    const handleSubmit = async () => {
        try {
            await createTruck({
                truck_name: truckName,
                vendor_id: vendorId,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                open_status: openStatus,
                schedule: {
                    days: scheduleDays.split(","),
                    times: scheduleTimes.split(","),
                },
                truck_type: truckType,
            });
            alert("Truck created!");
        } catch (err) {
            console.error("Failed to create truck:", err);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text>Truck Name</Text>
                <TextInput
                    value={truckName}
                    onChangeText={setTruckName}
                    placeholder="Taco Fiesta"
                />

                <Text>Vendor ID</Text>
                <TextInput
                    value={vendorId}
                    onChangeText={setVendorId}
                    placeholder="vendor_123"
                />

                <Text>Latitude</Text>
                <TextInput
                    value={latitude}
                    onChangeText={setLatitude}
                    keyboardType="numeric"
                />

                <Text>Longitude</Text>
                <TextInput
                    value={longitude}
                    onChangeText={setLongitude}
                    keyboardType="numeric"
                />

                <Text>Truck Type (Stationary or Mobile)</Text>
                <TextInput value={truckType} onChangeText={setTruckType} />

                <Text>Open Status</Text>
                <Switch value={openStatus} onValueChange={setOpenStatus} />

                <Text>Schedule Days (comma separated)</Text>
                <TextInput
                    value={scheduleDays}
                    onChangeText={setScheduleDays}
                    placeholder="Mon,Tue,Wed"
                />

                <Text>Schedule Times (comma separated)</Text>
                <TextInput
                    value={scheduleTimes}
                    onChangeText={setScheduleTimes}
                    placeholder="9AM-5PM,5PM-9PM"
                />

                <Button title="Create Truck" onPress={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
    );
}

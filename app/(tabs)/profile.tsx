import ProfileHeader from "@/components/ProfileHeader";
import { useAuth } from "@/context/authContext";
import { Text, View, Button, Alert } from "react-native";


export default function Profile() {
    const { signOut } = useAuth();

    // Handles sign-out process
    const handleSignOut = async () => {
        try {
            await signOut(); // Proper sign-out method
        } catch (error) {
            console.error("Sign Out Error:", error);
            Alert.alert("Error", "Failed to sign out. Please try again.");
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "red",
                borderWidth: 1,
            }}
        >
            <ProfileHeader
                name="Juan Hernandez"
                level={5}
                phoneNumber="123-456-7890"
                email="truckprojectdev@gmail.com"
                progress={80}
            />
            <View
                style={{
                    paddingTop: 80,
                    paddingBottom: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>This is the profile page.</Text>
                <Button title="Sign Out" onPress={handleSignOut} />
            </View>
        </View>
    );
}

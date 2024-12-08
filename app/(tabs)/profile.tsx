import { Text, View, Button } from "react-native";
import { useSession } from "@/context/ctx";

export default function Profile() {
    const { signOut } = useSession();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    paddingTop: 80,
                    paddingBottom: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>This is the profile page.</Text>
                <Button title="Sign Out" onPress={signOut} />
            </View>
        </View>
    );
}

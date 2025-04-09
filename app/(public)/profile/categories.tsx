import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserFavoriteCategoriesPage() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text>categories</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

import { Text } from "react-native";
import { Redirect, Tabs } from "expo-router";
import theme from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "@/context/ctx";

export default function TabsLayout() {
    //Sign in session
    const { session, isLoading } = useSession();
    
    //While is loading, display loading text
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    //If the user doesn't have a sign in session, redirect back to sign in page
    if (!session) {
        return <Redirect href="/sign-in" />;
    }

    //Return the actual pages of the app once logged in
    return (
        //All home,search, and profile tabs
        <Tabs
            screenOptions={{
                headerShown: false, // Hide the header
                tabBarStyle: {
                    backgroundColor: theme.colors.primary, // Tab bar background color
                    height: 100, // Increase height for proper spacing
                },
                tabBarItemStyle: {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15, // Add padding to the top of the icon
                },
                tabBarShowLabel: false, // Hide text labels
                tabBarActiveTintColor: theme.colors.white, // Active tab icon color
                tabBarInactiveTintColor: theme.colors.whiteInactive, // Inactive tab icon color
            }}
        >
            
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={30} color={color} /> // Home icon
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={30} color={color} /> // Search icon
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={30} color={color} /> // Profile icon
                    ),
                }}
            />
        </Tabs>
    );
}

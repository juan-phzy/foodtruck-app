// React Native Components
import { View, ActivityIndicator } from "react-native";

// Expo Router & Navigation
import { Redirect, Tabs } from "expo-router";

// Theme & Icons
import theme from "@/assets/theme";
import { Ionicons } from "@expo/vector-icons";
import { ms } from "react-native-size-matters";

// Context & State Management
import { useSession } from "@/context/ctx";

// Type for icon props
type TabIconProps = {
    color: string;
    name: keyof typeof Ionicons.glyphMap;
};

/**
 * Renders the tab bar icon for each tab.
 *
 * This function is moved outside of the component to avoid re-creating it
 * on every render, which improves performance.
 */
const renderTabIcon = ({ color, name }: TabIconProps) => (
    <Ionicons name={name} size={ms(25)} color={color} />
);

/**
 * **TabsLayout Component**
 *
 * This component manages bottom tab navigation.
 * - Redirects unauthenticated users to the sign-in screen.
 * - Uses Expo Router's `<Tabs />` for tabbed navigation.
 * - Applies consistent styling to the tab bar.
 */
export default function TabsLayout() {
    const { session, isLoading } = useSession(); 

    // Debugging: Log session state
    console.log(
        "TabsLayout Rendered | Session:",
        session,
        " | Loading:",
        isLoading
    );

    // Show a loading indicator while authentication is being verified
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    // If the user is not authenticated, redirect to Sign-In
    if (!session) {
        console.log("No active session. Redirecting to Sign-In...");
        return <Redirect href="/sign-in" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false, // Hide the header
                tabBarStyle: {
                    backgroundColor: theme.colors.primary, // Tab bar background color
                    height: ms(65), // Adjust height for proper spacing
                },
                tabBarItemStyle: {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarShowLabel: false, // Hide text labels
                tabBarActiveTintColor: theme.colors.white, // Active tab icon color
                tabBarInactiveTintColor: theme.colors.whiteInactive, // Inactive tab icon color
            }}
        >
            {/* Home Tab */}
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: (props) =>
                        renderTabIcon({ ...props, name: "home" }),
                }}
            />

            {/* Search Tab */}
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: (props) =>
                        renderTabIcon({ ...props, name: "search" }),
                }}
            />

            {/* Profile Tab */}
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: (props) =>
                        renderTabIcon({ ...props, name: "person" }),
                }}
            />

            {/* Test Tab */}
            <Tabs.Screen
                name="test"
                options={{
                    tabBarIcon: (props) =>
                        renderTabIcon({ ...props, name: "build-outline" }),
                }}
            />
        </Tabs>
    );
}

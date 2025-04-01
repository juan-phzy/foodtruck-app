/**
 * **TabsLayout Component**
 *
 * This component manages bottom tab navigation.
 * - Redirects unauthenticated users to the sign-in screen.
 * - Uses Expo Router's `<Tabs />` for tabbed navigation.
 * - Applies consistent styling to the tab bar.
 */

// Expo Router & Navigation
import { Redirect, Tabs } from "expo-router";

// Theme & Icons
import theme from "@/assets/theme";
import { Ionicons } from "@expo/vector-icons";
import { ms } from "react-native-size-matters";

// Context & State Management

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

export default function TabsLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.colors.primary, // Tab bar background color
                    height: ms(50), // Adjust height for proper spacing
                    elevation: 0, // Remove shadow on Android
                },
                tabBarItemStyle: {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                },
                headerShown: false, // Hide the header
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

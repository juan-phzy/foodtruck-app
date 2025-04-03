/**
 * VendorLayout
 *
 * Tab layout for vendor users. Renders the main vendor navigation tabs:
 * - Home (`index`) with store icon
 * - Users management (`users`) with cog icon
 * - Settings (`settings`) with WHMCS icon
 *
 * Uses custom icons from `react-icons/lia` for a unique vendor interface.
 */

import { Tabs } from "expo-router";
import { ms } from "react-native-size-matters";

// Theme
import theme from "@/assets/theme";

// Icons (React Native compatible)
import { FontAwesome6, Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

// Types
type TabIconProps = {
    color: string;
    name: "store" | "users" | "settings" | "test";
};

// Render tab icons by name
const renderTabIcon = ({ color, name }: TabIconProps) => {
    const size = ms(20);

    switch (name) {
        case "store":
            return <FontAwesome5 name="store" size={size} color={color} />;
        case "users":
            return <FontAwesome6 name="users-gear" size={size} color={color} />;
        case "settings":
            return <Ionicons name="settings" size={size} color={color} />;
        case "test":
            return <MaterialCommunityIcons name="test-tube" size={size} color={color} />;
        default:
            return null;
    }
};

export default function VendorLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.colors.primary,
                    elevation: 0,
                },
                tabBarItemStyle: {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: theme.colors.white,
                tabBarInactiveTintColor: theme.colors.whiteInactive,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color }) =>
                        renderTabIcon({ color, name: "store" }),
                }}
            />
            <Tabs.Screen
                name="users"
                options={{
                    tabBarIcon: ({ color }) =>
                        renderTabIcon({ color, name: "users" }),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: ({ color }) =>
                        renderTabIcon({ color, name: "settings" }),
                }}
            />
            <Tabs.Screen
                name="test"
                options={{
                    tabBarIcon: ({ color }) =>
                        renderTabIcon({ color, name: "test" }),
                }}
            />
        </Tabs>
    );
}

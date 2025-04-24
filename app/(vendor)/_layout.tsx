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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useInitVendorProfile } from "@/store/useVendorStore";
import { useInitVendorBusiness } from "@/store/useBusinessStore";

// Types
type TabIconProps = {
    color: string;
    name: "locations" | "employees" | "account" | "test";
};

// Render tab icons by name
const renderTabIcon = ({ color, name }: TabIconProps) => {
    const size = ms(25);

    switch (name) {
        case "locations":
            return (
                <MaterialCommunityIcons
                    name="store"
                    size={size}
                    color={color}
                />
            );
        case "employees":
            return (
                <MaterialCommunityIcons
                    name="account-group"
                    size={size}
                    color={color}
                />
            );
        case "account":
            return (
                <MaterialCommunityIcons
                    name="account-cog"
                    size={size}
                    color={color}
                />
            );
        case "test":
            return (
                <MaterialCommunityIcons
                    name="test-tube"
                    size={size}
                    color={color}
                />
            );
        default:
            return null;
    }
};

export default function VendorLayout() {
    
    useInitVendorProfile();
    useInitVendorBusiness();

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
                name="locations"
                options={{
                    tabBarIcon: ({ color }) =>
                        renderTabIcon({ color, name: "locations" }),
                }}
            />
            <Tabs.Screen
                name="employees"
                options={{
                    tabBarIcon: ({ color }) =>
                        renderTabIcon({ color, name: "employees" }),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    tabBarIcon: ({ color }) =>
                        renderTabIcon({ color, name: "account" }),
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

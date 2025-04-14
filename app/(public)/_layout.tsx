/**
 * PublicLayout
 *
 * Tab layout for public (non-vendor) users. Provides access to the main screens:
 * - Home (`index`) with home icon
 * - Search (`search`) with search icon
 * - Profile (`profile`) with person icon
 * - Test/Dev tools (`test`) with build icon
 *
 * Uses MaterialCommunityIcons for consistent, mobile-friendly tab bar icons.
 */

import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ms } from "react-native-size-matters";

// Theme
import theme from "@/assets/theme";

import { useInitUserProfile } from "@/store/useUserStore";

// Types
type TabIconProps = {
    color: string;
    name: keyof typeof MaterialCommunityIcons.glyphMap;
};

// Render Icon Helper
const renderTabIcon = ({ color, name }: TabIconProps) => (
    <MaterialCommunityIcons name={name} size={ms(25)} color={color} />
);

export default function PublicLayout() {
    useInitUserProfile();

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
                    tabBarIcon: (props) =>
                        renderTabIcon({ ...props, name: "home" }),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: (props) =>
                        renderTabIcon({ ...props, name: "magnify" }),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: (props) =>
                        renderTabIcon({ ...props, name: "account" }),
                }}
            />
            <Tabs.Screen
                name="test"
                options={{
                    tabBarIcon: (props) =>
                        renderTabIcon({ ...props, name: "test-tube" }),
                }}
            />
        </Tabs>
    );
}

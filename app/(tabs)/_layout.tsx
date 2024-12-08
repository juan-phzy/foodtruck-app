import { Text } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { useSession } from '@/context/ctx';
import theme from '@/theme/theme';

export default function TabsLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Tabs
    screenOptions={{
      headerShown: false, // Hide the header
      tabBarStyle: {
        backgroundColor: theme.colors.primary, // Background color of the tab bar
      },
      tabBarActiveTintColor: theme.colors.white, // Active tab icon/text color
      tabBarInactiveTintColor: theme.colors.whiteInactive, // Inactive tab icon/text color
    }}
    >
      <Tabs.Screen
        name="index"
        options={{headerTitle: "Home",}}
      />
      <Tabs.Screen
        name="search"
        options={{headerTitle: "Search",}}
      />
      <Tabs.Screen
        name="profile"
        options={{headerTitle: "Profile",}}
      />
    </Tabs>
  );
}
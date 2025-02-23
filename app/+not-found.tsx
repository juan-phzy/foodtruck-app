import { View, StyleSheet, Text } from "react-native";
import { Link, Stack } from "expo-router";

/**
 * NotFoundScreen Component
 *
 * This screen is displayed when a user tries to access a route that does not exist.
 * Provides a friendly message and a navigation link to return to the home screen.
 */
export default function NotFoundScreen() {
  return (
    <>
      {/* Sets the screen title in the navigation stack */}
      <Stack.Screen options={{ title: "Page Not Found" }} />

      {/* Main container for the error screen */}
      <View style={styles.container}>
        <Text style={styles.message}>Oops! The page you're looking for doesn't exist.</Text>
        
        {/* Link to navigate back to the home screen */}
        <Link href="/(tabs)" style={styles.button}>
          Go back to Home
        </Link>
      </View>
    </>
  );
}

/**
 * Styles for NotFoundScreen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up full screen space
    backgroundColor: "#25292e", // Dark background for contrast
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
    paddingHorizontal: 20, // Adds padding for better readability
  },

  message: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20, // Space between text and button
  },

  button: {
    fontSize: 18,
    textDecorationLine: "underline", // Underlines the link for clarity
    color: "#fff", // White text for better contrast
  },
});

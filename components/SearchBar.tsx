import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@/theme/theme";
import CircleButton from "./CircleButton";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={["rgba(255, 132, 0, 0.9)", "rgba(255, 132, 0, 0)"]} // Full opacity to 0% opacity
        locations={[.5, 1]} // Start at the top and end halfway
        style={styles.gradient}
      />
      {/* Input Field */}
      <TextInput
        placeholder="Search other places"
        style={styles.input}
        placeholderTextColor={theme.colors.primaryInactive}
        onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
      />
      <CircleButton
        icon={<Ionicons name="layers" size={25} color={theme.colors.primary} />}
        onPress={() => {}} // Implement search functionality
        />
        <CircleButton
        icon={<Ionicons name="location" size={25} color={theme.colors.primary} />}
        onPress={() => {}} // Implement search functionality
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    position: "absolute",
    top: 0,
    paddingTop: 75,
    paddingBottom: 60,
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
    zIndex: 10,
    //overflow: "hidden", // Ensures the gradient doesn't exceed the container
  },
  gradient: {
    // borderWidth:4,
    // borderColor: 'red',
    ...StyleSheet.absoluteFillObject, // Ensures the gradient covers the entire container
  },
  input: {
    flex:1,
    height: 40,
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: 15,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 0,
    fontSize: 16,
    shadowColor: theme.colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});

export default SearchBar;

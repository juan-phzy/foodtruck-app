import { Text, View } from "react-native";

export default function Search() {
  //No current implementation for the search screen yet, so display the default text
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the search page.</Text>
    </View>
  );
}

import { Text, View, Button } from "react-native";
import { useSession } from "@/context/ctx";

export default function Index() {
  const { signOut } = useSession();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the home page.</Text>
      <Button
        title="Sign Out"
        onPress={signOut}
      />
    </View>
  );
}

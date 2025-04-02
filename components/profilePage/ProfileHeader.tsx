import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { MunchUser } from "@/constants";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

interface ProfileHeaderProps {
  user: MunchUser;
}

const { width } = Dimensions.get("window");

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/login");

      // Redirect to your desired page
      //   Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainRow}>
        <View style={styles.profilePicture}>
          <Text style={styles.profilePictureText}>{user.name[0]}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{`Munch Level: ${user.munchLevel}`}</Text>
        </View>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.settingsContainer}
        >
          <Text style={styles.settingsText}>Settings</Text>
          <Ionicons
            name="settings"
            size={ms(25)}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.bold}>Phone Number</Text>
        <Text style={styles.text}>{user.phone}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.bold}>Email</Text>
        <Text style={styles.text}>{user.email}</Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  rootContainer: {
    paddingHorizontal: theme.padding.sm,
    paddingVertical: theme.padding.lg,
    gap: theme.padding.xs,
    borderBottomColor: theme.colors.grayLight,
    borderBottomWidth: 1,
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    backgroundColor: theme.colors.brown,
    borderRadius: "30@ms",
    width: "60@ms",
    height: "60@ms",
    justifyContent: "center", 
    alignItems: "center",
  },
  profilePictureText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
  },
  nameContainer: {
    flex: 1,
    textAlignVertical: "center",
    height: "50@ms",
    justifyContent: "center",
    marginLeft: theme.padding.sm,
  },
  name: {
    fontSize: theme.fontSize.sm,
    fontWeight: "bold",
  },
  text: {
    fontSize: theme.fontSize.xs,
  },
  settingsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.padding.sm,
    alignItems: "center",
  },
  settingsText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    fontWeight: "bold",
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontSize: theme.fontSize.xs,
    fontWeight: "bold",
  },
});

export default ProfileHeader;

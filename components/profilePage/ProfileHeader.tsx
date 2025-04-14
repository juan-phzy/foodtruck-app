import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ms, ScaledSheet } from "react-native-size-matters";
import theme from "@/assets/theme";
import { useRouter } from "expo-router";
import { PublicUserProfile } from "@/types";

interface ProfileHeaderProps {
  user: PublicUserProfile;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainRow}>
        <View style={styles.profilePicture}>
          <Text style={styles.profilePictureText}>{user.first_name[0]}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{`${user.first_name} ${user.last_name}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(public)/profile/settings")}
          style={styles.settingsContainer}
        >
          <Text style={styles.settingsText}>Settings</Text>
          <MaterialCommunityIcons
            name="cog"
            size={ms(25)}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.bold}>Phone Number</Text>
        <Text style={styles.text}>{user.phone_number}</Text>
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

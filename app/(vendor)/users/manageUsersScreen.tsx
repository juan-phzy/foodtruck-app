import theme from "@/assets/theme";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import IconButton from "@/components/buttons/IconButton";
import { MANAGE_SCREEN_USERS } from "@/constants";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

// Sample Data
const sampleUsers = MANAGE_SCREEN_USERS;

export default function ManageUsersScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Manage Users</Text>
                <Ionicons
                    name="add"
                    size={45}
                    color={theme.colors.primary}
                    onPress={() => console.log("Clicked Add User")}
                />
            </View>
            {/* Manage User List */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {sampleUsers.map((user, index) => (
                    <IconButton
                        key={user.name + index}
                        iconName={
                            user.type == "User" ? "user-large" : "user-shield"
                        }
                        text={user.name}
                        showManage={true}
                        onPress={() => console.log("Clicked Manage User")}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryLight,
        paddingHorizontal: theme.padding.xl,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: theme.padding.lg,
    },
    headerText: {
        fontSize: theme.fontSize.xl,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    scrollView: {
        gap: "10@ms",
        paddingBottom: theme.padding.md,
    },
});

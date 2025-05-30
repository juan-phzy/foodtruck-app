import theme from "@/assets/theme";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import IconButton from "@/components/buttons/IconButton";
import { MANAGE_SCREEN_USERS } from "@/constants";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

// Sample Data
const sampleUsers = MANAGE_SCREEN_USERS;

export default function EmployeesIndex() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Manage Users</Text>
                <MaterialCommunityIcons
                    name="plus"
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
                            user.type == "User" ? "badge-account-horizontal" : "shield-account"
                        }
                        text={user.name}
                        showManage={true}
                        onPress={() => {
                            router.push(`/employees/${user.name}/manageUser`);
                        }}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = ScaledSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.primaryExtraLight,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: theme.padding.md,
        paddingHorizontal: theme.padding.sm,
    },
    headerText: {
        fontSize: theme.fontSize.xl,
        fontWeight: "bold",
        color: theme.colors.black,
    },
    scrollView: {
        gap: "10@ms",
        paddingVertical: theme.padding.md,
        paddingHorizontal: theme.padding.sm,
    },
});

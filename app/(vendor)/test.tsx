import theme from "@/assets/theme";
import icon from "@/assets/images/icon.png";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import SmallIconButton from "@/components/buttons/SmallIconButton";
import SideBySideRow from "@/components/vendor/SideBySideRow";


/* 
    For future implementation to pass in picture and name of food truck.
    For now, generic truck icon and name is shown
*/
interface ManageTruckProps {
  truckName: string;
  image: string;
}

export default function ManageTruck() {
  const insets = useSafeAreaInsets();

  const [isOpen, setIsOpen] = useState(false);
  const [useLiveLocation, setUseLiveLocation] = useState(false);

  return (
    <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBack}>
          <View style={styles.arrowButton}>
            <Ionicons
              name="arrow-back"
              size={theme.fontSize.xxl}
              color={theme.colors.white}
            />
          </View>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.truckImageAndText}>
          <Image source={icon} style={styles.truckLogo} />
          <Text style={{ fontSize: theme.fontSize.xxl, fontWeight: "bold" }}>
            Tasty Tacos
          </Text>
        </View>
      </View>
      {/* 
                Created a side by side row component (holds a left and right component with a divider bar below it).
                I suggest we use this as a standard component going forward because the figma shows it in many different places. 
                I also created a new vendor component sub-folder, where the SidebySideRow component is located.
             */}
      <View>
        <SideBySideRow
          leftComponent={
            <SmallIconButton iconName="bar-chart" text="View Insights" />
          }
          rightComponent={<SmallIconButton iconName="list" text="Edit Menu" />}
        />
      </View>
      <View>
        <SideBySideRow
          leftComponent={<Text style={styles.settingText}>Open/Close</Text>}
          rightComponent={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.settingValue}>
                {isOpen ? "Open" : "Closed"}
              </Text>
              <Switch
                value={isOpen}
                onValueChange={setIsOpen}
                trackColor={{
                  false: theme.colors.gray,
                  true: theme.colors.primary,
                }}
                thumbColor={theme.colors.white}
                style={styles.switchStyle}
              />
            </View>
          }
        />
      </View>
      <View>
        <SideBySideRow
          leftComponent={
            <Text style={styles.settingText}>Use Live Location</Text>
          }
          rightComponent={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.settingValue}>
                {useLiveLocation ? "On" : "Off "}
              </Text>
              <Switch
                value={useLiveLocation}
                onValueChange={setUseLiveLocation}
                trackColor={{
                  false: theme.colors.gray,
                  true: theme.colors.primary,
                }}
                thumbColor={theme.colors.white}
                style={styles.switchStyle}
              />
            </View>
          }
        />
      </View>
      <View>
        <SideBySideRow
          leftComponent={
            <Text
              style={[
                styles.settingText,
                {
                  color: !useLiveLocation
                    ? theme.colors.black
                    : theme.colors.gray,
                },
              ]}
            >
              Set Location
            </Text>
          }
          rightComponent={
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} disabled={useLiveLocation}>
                <Text
                  style={[
                    styles.settingValue,
                    {
                      color: !useLiveLocation
                        ? theme.colors.black
                        : theme.colors.gray,
                    },
                  ]}
                >
                  123 Main Street
                </Text>
                <Ionicons
                  name="pencil"
                  size={theme.fontSize.xxl}
                  color={!useLiveLocation? theme.colors.black : theme.colors.gray}
                />
              </TouchableOpacity> 
          }
        />
      </View>
      <View>
        <SideBySideRow
          leftComponent={<Text style={styles.settingText}>Set Schedule</Text>}
          rightComponent={
            <TouchableOpacity onPress = {() => console.log("Set Schedule Pressed")}>
                <Ionicons
                    name="caret-forward-outline"
                    size={theme.fontSize.xxl}
                    
                    />
            </TouchableOpacity>
          }
        />
      </View>
      <View>
        <SideBySideRow
          leftComponent={<Text style={styles.settingText}>Set Unique Images</Text>}
          rightComponent={
            <TouchableOpacity onPress = {() => console.log("Set Unique Images Pressed")}>
                <Ionicons
                    name="caret-forward-outline"
                    size={theme.fontSize.xxl}
                    />
            </TouchableOpacity>
          }
        />
      </View>
      
    </View>
  );
}

const styles = ScaledSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: "20@ms",
  },
  header: {
    marginTop: "5@ms",
  },
  goBack: {
    flexDirection: "row",
    gap: "10@ms",
    alignItems: "center",
  },
  arrowButton: {
    borderRadius: "20@ms",
    width: "35@ms",
    height: "35@ms",
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  goBackText: {
    fontSize: theme.fontSize.lg,
  },
  truckImageAndText: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10@ms"
  },
  truckLogo: {
    width: "125@ms",
    height: "125@ms",
  },
  settingText: {
    fontSize: "15@ms",
    fontWeight: "bold",
  },
  settingValue: {
    fontSize: "15@ms",
    fontWeight: "bold",
    marginRight: "10@ms",
  },
  switchStyle: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});

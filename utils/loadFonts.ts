// utils/loadFonts.ts

import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export async function loadCustomFonts() {
  await Font.loadAsync({
    ...MaterialCommunityIcons.font,
  });
}

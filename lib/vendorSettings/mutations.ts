// lib/userSettings/mutations.ts

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useSettingsMutations = () => ({
  updateDOB: useMutation(api.vendors.updateDOB),
  // Add more as needed
});

// lib/userSettings/mutations.ts

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useSettingsMutations = () => ({
  updateDOB: useMutation(api.users.updateDOB),
  updatePrimaryCity: useMutation(api.users.updatePrimaryCity),
  // Add more as needed
});

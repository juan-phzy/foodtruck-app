// lib/userSettings/handlers.ts
import { UserResource } from "@clerk/types";
import { useSettingsMutations } from "./mutations";
import { PhoneNumberResource } from "@clerk/types";

export type SettingsForm = Record<string, string>;

export type SectionKey = "personal" | "security" | "contact" | "notifications";
// Removed redundant type alias SubKey
export type SettingsHandler = (
    user: UserResource,
    form: SettingsForm
) => Promise<void>;

type SectionHandlerMap = {
    [section in SectionKey]: {
        [subkey: string]: SettingsHandler;
    };
};

export const useSettingsHandlers = (): SectionHandlerMap => {
    const mutations = useSettingsMutations();

    return {
        personal: {
            name: async (user, form) => {
                await user.update({
                    firstName: form.first_name,
                    lastName: form.last_name,
                });
            },
            dob: async (user, form) => {
                await mutations.updateDOB({ clerkId: user.id, dob: form.dob });
            },
            city: async (user, form) => {
                await mutations.updatePrimaryCity({
                    clerkId: user.id,
                    primary_city: form.primary_city,
                });
            },
        },
        security: {
            password: async (_user, form) => {
                console.log("Update password to:", form.password);
            },
        },
        contact: {
            email: async (user, form) => {
                console.log("Update email to:", form.email);
            },
            phone: async (user, form) => {
                console.log("Update phone to:", form.phone_number);
                try {
                    // Step 1: Create a new phone number
                    const phoneObj = await user.createPhoneNumber({
                        phoneNumber: form.phone_number,
                    });

                    // Step 2: Set it as the primary phone number
                    await user.update({
                        primaryPhoneNumberId: phoneObj.id,
                    });

                    // Optional: Delete the old number
                    const currentPhone = user.phoneNumbers.find(
                        (p) => p.id !== phoneObj.id
                    );
                    if (currentPhone) {
                        await currentPhone.destroy();
                    }

                    console.log("Phone number updated!");
                } catch (err) {
                    console.error("Failed to update phone number:", err);
                }
            },
        },
        notifications: {
            preferences: async () => {
                console.log("Update notification prefs");
            },
        },
    };
};

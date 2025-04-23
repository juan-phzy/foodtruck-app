// lib/userSettings/handlers.ts
import { UserResource } from "@clerk/types";
import { useSettingsMutations } from "./mutations";

export type SettingsForm = Record<string, string>;

export type SectionKey = "personal" | "security" | "contact" | "notifications";
export type SettingsHandler = (
    user: UserResource,
    form: SettingsForm
) => Promise<boolean | void>;

type SectionHandlerMap = {
    [section in SectionKey]: {
        [subkey: string]: SettingsHandler;
    };
};

type VerificationHandlerParams = {
    verifyingPhone: boolean;
    setVerifyingPhone: (v: boolean) => void;
    verificationCode: string;
    setVerificationCode: (v: string) => void;
    verificationId: string | null;
    setVerificationId: (id: string | null) => void;
    verifyingEmail?: boolean;
    setVerifyingEmail?: (v: boolean) => void;
    emailVerificationCode?: string;
    setEmailVerificationCode?: (v: string) => void;
    emailVerificationId?: string | null;
    setEmailVerificationId?: (id: string | null) => void;
};

export const useSettingsHandlers = ({
    verifyingPhone,
    setVerifyingPhone,
    verificationCode,
    setVerificationCode,
    verificationId,
    setVerificationId,
    verifyingEmail = false,
    setVerifyingEmail = () => {},
    emailVerificationCode = "",
    setEmailVerificationCode = () => {},
    emailVerificationId = null,
    setEmailVerificationId = () => {},
}: VerificationHandlerParams): SectionHandlerMap => {
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
            password: async (user, form) => {
                console.log("Update password to:", form.password);
                await user.updatePassword({
                    currentPassword: form.current_password,
                    newPassword: form.password,
                })
            },
        },
        contact: {
            email: async (user, form) => {
                try {
                    if (!verifyingEmail) {
                        const emailObj = await user.createEmailAddress({
                            email: form.email,
                        });

                        setEmailVerificationId(emailObj.id);
                        setVerifyingEmail(true); // move this BEFORE await
                        await emailObj.prepareVerification({
                            strategy: "email_code",
                        });

                        return false;
                    }

                    if (verifyingEmail && emailVerificationId) {
                        const email = user.emailAddresses.find(
                            (e) => e.id === emailVerificationId
                        );
                        if (email) {
                            await email.attemptVerification({
                                code: emailVerificationCode,
                            });
                            await user.update({
                                primaryEmailAddressId: email.id,
                            });

                            const oldEmail = user.emailAddresses.find(
                                (e) => e.id !== email.id
                            );
                            if (oldEmail) await oldEmail.destroy();

                            setEmailVerificationId(null);
                            setVerifyingEmail(false);
                            setEmailVerificationCode("");
                        }
                    }
                } catch (err) {
                    console.error("Failed to update email:", err);
                }
            },
            phone: async (user, form) => {
                try {
                    if (!verifyingPhone) {
                        const phoneObj = await user.createPhoneNumber({
                            phoneNumber: form.phone_number,
                        });

                        await phoneObj.prepareVerification();
                        setVerificationId(phoneObj.id);
                        setVerifyingPhone(true);
                        return false;
                    }

                    if (verifyingPhone && verificationId) {
                        const phone = user.phoneNumbers.find(
                            (p) => p.id === verificationId
                        );
                        if (phone) {
                            await phone.attemptVerification({
                                code: verificationCode,
                            });
                            await user.update({
                                primaryPhoneNumberId: phone.id,
                            });

                            const oldPhone = user.phoneNumbers.find(
                                (p) => p.id !== phone.id
                            );
                            if (oldPhone) await oldPhone.destroy();

                            setVerificationId(null);
                            setVerifyingPhone(false);
                            setVerificationCode("");
                        }
                    }
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

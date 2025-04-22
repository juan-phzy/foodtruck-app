import { SettingsSection } from "@/constants";

export type SettingsField = {
  label: string;
  link: string;
  displayValue: (user: any) => string;
};

export type SectionKey = "personal" | "security" | "contact" | "notifications";


type SettingsConfigType = Record<
  SettingsSection,
  {
    title: string;
    fields: SettingsField[];
  }
>;

export const SETTINGS_CONFIG: SettingsConfigType = {
  personal: {
    title: "Edit Profile",
    fields: [
      {
        label: "Name",
        link: "name",
        displayValue: (user) => `${user.first_name} ${user.last_name}`,
      },
      {
        label: "Date of Birth",
        link: "dob",
        displayValue: (user) => user.dob ?? "Not Set",
      },
      {
        label: "Primary City",
        link: "city",
        displayValue: (user) => user.primary_city ?? "Not Set",
      },
    ],
  },
  contact: {
    title: "Contact Information",
    fields: [
      {
        label: "Email",
        link: "email",
        displayValue: (user) => user.email,
      },
      {
        label: "Phone Number",
        link: "phone",
        displayValue: (user) => user.phone_number ?? "Not Set",
      },
    ],
  },
  security: {
    title: "Security Settings",
    fields: [
      {
        label: "Password",
        link: "password",
        displayValue: () => "********",
      },
    ],
  },
  notifications: {
    title: "Notifications",
    fields: [
      {
        label: "Notification Preferences",
        link: "preferences",
        displayValue: () => "Manage",
      },
    ],
  },
};

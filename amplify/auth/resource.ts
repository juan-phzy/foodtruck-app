import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    phone: true, // Enables phone number login
  },
  multifactor: {
    mode: 'OPTIONAL', // Users can choose to enable MFA (set to 'REQUIRED' to enforce it)
    sms: true, // Enables SMS-based MFA
  },
  userAttributes: {
    phoneNumber: { 
      required: true, // Required for SMS-based MFA
    },
  },
});

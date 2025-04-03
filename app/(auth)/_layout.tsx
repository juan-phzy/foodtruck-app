/**
 * AuthRoutesLayout
 *
 * This layout wraps all routes under the `(auth)` group (e.g., login, create).
 * It checks the user's auth state:
 * - If the user **is signed in**, redirect them to the root (`/`)
 * - If **not signed in**, render the auth-related screens normally
 *
 * This prevents signed-in users from accessing login/signup routes.
 */

import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

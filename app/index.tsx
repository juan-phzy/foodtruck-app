/**
 * Index Route
 *
 * This is the root entry point (`/`). It immediately redirects the user to the login screen.
 * You can customize this logic later to check authentication and redirect conditionally.
 */

import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(auth)/login" />;
}

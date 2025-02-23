import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import {
  getStorageItemAsync,
  setStorageItemAsync,
  removeStorageItemAsync,
} from "@/storage/useStorageState";

/**
 * AuthContextType defines the shape of the authentication context.
 * 
 * - `signIn`: Asynchronous function to simulate a user login.
 * - `signOut`: Asynchronous function to log the user out.
 * - `session`: The current session token (or null if not authenticated).
 * - `isLoading`: Indicates if session state is being loaded from storage.
 */
type AuthContextType = {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  session: string | null;
  isLoading: boolean;
};

// Create a context to manage authentication state
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Custom hook to access the authentication session context.
 * Ensures the component is wrapped within a `SessionProvider`.
 * 
 * @throws Error if used outside of a `SessionProvider`.
 */
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

/**
 * SessionProvider Component
 * 
 * This component manages authentication state and session persistence.
 * It loads the session from local storage on app startup and provides
 * functions for temporary sign-in and sign-out.
 */
export function SessionProvider({ children }: Readonly<PropsWithChildren<{}>>) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Loads the session token from storage when the app starts.
   * If a session exists, it is set in the component state.
   */
  useEffect(() => {
    const loadSession = async () => {
      console.log("Loading session from storage...");
      const storedSession = await getStorageItemAsync("session");

      if (storedSession) {
        console.log(`Retrieved session: "${storedSession}"`);
        setSession(storedSession);
      } else {
        console.log("No session found.");
      }

      setIsLoading(false);
    };
    loadSession();
  }, []);

  /**
   * Simulates a user sign-in by setting a mock session token.
   * Stores the token in SecureStore or localStorage for persistence.
   */
  const signIn = async () => {
    console.log("SignIn function called...");
    const mockToken = "mock-user-token"; // Temporary mock token

    setSession(mockToken);
    await setStorageItemAsync("session", mockToken);
    console.log(`Mock sign-in complete. Session stored: "${mockToken}"`);
  };

  /**
   * Simulates a user sign-out by clearing the session token.
   * Removes the session from SecureStore or localStorage.
   */
  const signOut = async () => {
    console.log("Signing out...");
    setSession(null);
    await removeStorageItemAsync("session");
    console.log("Sign-out complete, session cleared.");
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

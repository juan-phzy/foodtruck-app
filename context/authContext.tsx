import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { router } from "expo-router";
import { fetchAuthSession, getCurrentUser, signIn, signOut, AuthUser } from "aws-amplify/auth";

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

// Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if the user is already signed in on app startup
    useEffect(() => {
        const checkUser = async () => {
            try {
                // Fetch user session
                await fetchAuthSession();

                // Get user info if session exists
                const authUser = await getCurrentUser();
                setUser(authUser);
            } catch (error) {
                setUser(null);
            }
            setIsLoading(false);
        };

        checkUser();
    }, []);

    // Sign in function
    const handleSignIn = async (email: string, password: string) => {
        try {
            await signIn({ username: email, password });
            const authUser = await getCurrentUser();
            setUser(authUser);
            router.replace("/"); // Redirect to home
        } catch (error) {
            console.error("Sign In Error:", error);
        }
    };

    // Sign out function
    const handleSignOut = async () => {
        try {
            await signOut();
            setUser(null);
            router.replace("/sign-in");
        } catch (error) {
            console.error("Sign Out Error:", error);
        }
    };

    // Memoize the value to prevent unnecessary re-renders
    const authContextValue = useMemo(
        () => ({ user, isLoading, signIn: handleSignIn, signOut: handleSignOut }),
        [user, isLoading] // Recompute only when user or isLoading changes
    );

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

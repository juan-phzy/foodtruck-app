import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../storage/useStorageState';

{/*Creates a context with sign in/Up, is a session present, and is the data loading*/}
const AuthContext = createContext<{ 
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() { {/*Allows the use of the above methods in any files by destructuring */}
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}


//Wraps the app in a session and ensures authetication
export function SessionProvider({ children }: Readonly<PropsWithChildren<{}>>) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
    value={{
      //Sign in and out methods are defined here
      signIn: () => {
        // Perform sign-in logic here
          setSession('xxx');
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

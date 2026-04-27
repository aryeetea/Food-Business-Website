import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from 'react';
import { isApiConfigured, upsertUser } from '../api';

export interface AuthUser {
  email: string;
  fullName: string;
  phone: string;
}

interface SignInPayload {
  email: string;
  fullName: string;
  phone: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  signIn: (payload: SignInPayload) => Promise<void>;
  signOut: () => void;
}

const STORAGE_KEY = 'gobe-hemaa-user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedUser = window.localStorage.getItem(STORAGE_KEY);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as AuthUser);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsReady(true);
  }, []);

  const signIn = useCallback(async (payload: SignInPayload) => {
    const nextUser = {
      email: payload.email.trim().toLowerCase(),
      fullName: payload.fullName.trim(),
      phone: payload.phone.trim(),
    };

    const persistedUser = isApiConfigured ? await upsertUser(nextUser) : nextUser;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedUser));
    setUser(persistedUser);
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isReady,
      signIn,
      signOut,
    }),
    [isReady, signIn, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

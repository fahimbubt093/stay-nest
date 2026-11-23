"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authService } from "@/lib/auth/auth-service";
import type {
  AuthSnapshot,
  AuthUser,
  NewDemoUser,
  UpdatedDemoUser,
} from "@/lib/auth/types";

type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "error";

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  users: AuthUser[];
  error: string | null;
  reload: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createUser: (input: NewDemoUser) => Promise<void>;
  updateUser: (id: string, input: UpdatedDemoUser) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Authentication could not be completed. Try again.";
}

function getAuthStatus(snapshot: AuthSnapshot): AuthStatus {
  return snapshot.user ? "authenticated" : "unauthenticated";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const applySnapshot = useCallback((snapshot: AuthSnapshot) => {
    setUser(snapshot.user);
    setUsers(snapshot.users);
    setSessionExpiresAt(snapshot.expiresAt);
    setStatus(getAuthStatus(snapshot));
    setError(null);
  }, []);

  const reload = useCallback(async () => {
    try {
      applySnapshot(await authService.getSnapshot());
    } catch (loadError) {
      setUser(null);
      setStatus("error");
      setError(getMessage(loadError));
    }
  }, [applySnapshot]);

  useEffect(() => {
    let isActive = true;

    void authService
      .getSnapshot()
      .then((snapshot) => {
        if (isActive) {
          applySnapshot(snapshot);
        }
      })
      .catch((loadError: unknown) => {
        if (isActive) {
          setUser(null);
          setStatus("error");
          setError(getMessage(loadError));
        }
      });

    function handleStorageChange(event: StorageEvent) {
      if (
        event.key === null ||
        event.key === "stay-nest-demo-users" ||
        event.key === "stay-nest-demo-session"
      ) {
        void reload();
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => {
      isActive = false;
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [applySnapshot, reload]);

  useEffect(() => {
    if (sessionExpiresAt === null) {
      return;
    }

    const remaining = sessionExpiresAt - Date.now();
    const timeout = window.setTimeout(
      () => void reload(),
      Math.max(remaining, 0) + 50,
    );
    return () => window.clearTimeout(timeout);
  }, [reload, sessionExpiresAt]);

  const login = useCallback(
    async (email: string, password: string) => {
      applySnapshot(await authService.login(email, password));
    },
    [applySnapshot],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    applySnapshot({ user: null, users, expiresAt: null });
  }, [applySnapshot, users]);

  const createUser = useCallback(
    async (input: NewDemoUser) => {
      applySnapshot(await authService.createUser(input));
    },
    [applySnapshot],
  );

  const updateUser = useCallback(
    async (id: string, input: UpdatedDemoUser) => {
      applySnapshot(await authService.updateUser(id, input));
    },
    [applySnapshot],
  );

  const deleteUser = useCallback(
    async (id: string) => {
      applySnapshot(await authService.deleteUser(id));
    },
    [applySnapshot],
  );

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        users,
        error,
        reload,
        login,
        logout,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

import type { AuthSession, StoredDemoUser } from "@/lib/auth/types";

const USERS_STORAGE_KEY = "stay-nest-demo-users";
const SESSION_STORAGE_KEY = "stay-nest-demo-session";

export class AuthStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthStorageError";
  }
}

export interface AuthRepository {
  loadUsers(): Promise<StoredDemoUser[]>;
  saveUsers(users: StoredDemoUser[]): Promise<void>;
  loadSession(): Promise<AuthSession | null>;
  saveSession(session: AuthSession): Promise<void>;
  clearSession(): Promise<void>;
}

function getLocalStorage(): Storage {
  if (typeof window === "undefined") {
    throw new AuthStorageError("Browser storage is only available in the browser.");
  }

  try {
    return window.localStorage;
  } catch {
    throw new AuthStorageError(
      "Browser storage is unavailable. Enable local storage and try again.",
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStoredDemoUser(value: unknown): value is StoredDemoUser {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    value.id.length > 0 &&
    value.id !== "default-admin" &&
    typeof value.fullName === "string" &&
    typeof value.email === "string" &&
    (value.role === "Admin" || value.role === "Staff") &&
    typeof value.passwordSalt === "string" &&
    typeof value.passwordHash === "string"
  );
}

function isAuthSession(value: unknown): value is AuthSession {
  return (
    isRecord(value) &&
    typeof value.userId === "string" &&
    value.userId.length > 0 &&
    typeof value.expiresAt === "number" &&
    Number.isFinite(value.expiresAt)
  );
}

function parseUsers(serializedUsers: string | null): StoredDemoUser[] {
  if (serializedUsers === null) {
    return [];
  }

  let parsedUsers: unknown;
  try {
    parsedUsers = JSON.parse(serializedUsers);
  } catch {
    throw new AuthStorageError(
      "Saved demo users could not be read. Clear the site's demo user data and try again.",
    );
  }

  if (!Array.isArray(parsedUsers) || !parsedUsers.every(isStoredDemoUser)) {
    throw new AuthStorageError(
      "Saved demo users have an invalid format. Clear the site's demo user data and try again.",
    );
  }

  return parsedUsers;
}

function parseSession(serializedSession: string | null): AuthSession | null {
  if (serializedSession === null) {
    return null;
  }

  try {
    const parsedSession: unknown = JSON.parse(serializedSession);
    return isAuthSession(parsedSession) ? parsedSession : null;
  } catch {
    return null;
  }
}

export const localStorageAuthRepository: AuthRepository = {
  async loadUsers() {
    try {
      return parseUsers(getLocalStorage().getItem(USERS_STORAGE_KEY));
    } catch (error) {
      if (error instanceof AuthStorageError) {
        throw error;
      }

      throw new AuthStorageError(
        "Saved demo users could not be accessed. Enable browser storage and try again.",
      );
    }
  },

  async saveUsers(users) {
    try {
      getLocalStorage().setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      if (error instanceof AuthStorageError) {
        throw error;
      }

      throw new AuthStorageError(
        "Demo users could not be saved. Check available browser storage and try again.",
      );
    }
  },

  async loadSession() {
    let serializedSession: string | null;
    try {
      serializedSession = getLocalStorage().getItem(SESSION_STORAGE_KEY);
    } catch (error) {
      if (error instanceof AuthStorageError) {
        throw error;
      }

      throw new AuthStorageError(
        "Your demo session could not be accessed. Enable browser storage and try again.",
      );
    }

    const session = parseSession(serializedSession);
    if (serializedSession !== null && session === null) {
      await this.clearSession();
    }

    return session;
  },

  async saveSession(session) {
    try {
      getLocalStorage().setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      if (error instanceof AuthStorageError) {
        throw error;
      }

      throw new AuthStorageError(
        "Your demo session could not be saved. Enable browser storage and try again.",
      );
    }
  },

  async clearSession() {
    try {
      getLocalStorage().removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      if (error instanceof AuthStorageError) {
        throw error;
      }

      throw new AuthStorageError(
        "Your demo session could not be cleared. Enable browser storage and try again.",
      );
    }
  },
};

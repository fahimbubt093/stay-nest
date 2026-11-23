import {
  DEFAULT_ADMIN_ID,
  type AuthSession,
  type AuthSnapshot,
  type AuthUser,
  type NewDemoUser,
  type StoredDemoUser,
  type UpdatedDemoUser,
  type UserRole,
} from "@/lib/auth/types";
import {
  localStorageAuthRepository,
  type AuthRepository,
} from "@/lib/auth/auth-storage";

export const DEFAULT_ADMIN_CREDENTIALS = {
  email: "admin@staynest.com",
  password: "StayNest@123",
} as const;

const DEFAULT_ADMIN: AuthUser = {
  id: DEFAULT_ADMIN_ID,
  fullName: "Stay Nest Admin",
  email: DEFAULT_ADMIN_CREDENTIALS.email,
  role: "Admin",
  isDefaultAdmin: true,
};
const SESSION_LIFETIME_MS = 15 * 24 * 60 * 60 * 1000;
const PASSWORD_HASH_ITERATIONS = 120_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AuthErrorCode =
  | "invalid_credentials"
  | "invalid_input"
  | "duplicate_email"
  | "user_not_found"
  | "default_user_protected"
  | "crypto_unavailable";

export class AuthError extends Error {
  constructor(
    public readonly code: AuthErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

function toPublicUser(user: StoredDemoUser): AuthUser {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isDefaultAdmin: false,
  };
}

function toPublicUsers(storedUsers: StoredDemoUser[]): AuthUser[] {
  return [DEFAULT_ADMIN, ...storedUsers.map(toPublicUser)];
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isUserRole(role: UserRole): boolean {
  return role === "Admin" || role === "Staff";
}

function validateUserFields(
  fullName: string,
  email: string,
  role: UserRole,
): { fullName: string; email: string; role: UserRole } {
  const normalizedName = fullName.trim();
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedName) {
    throw new AuthError("invalid_input", "Enter the user's full name.");
  }
  if (!emailPattern.test(normalizedEmail)) {
    throw new AuthError("invalid_input", "Enter a valid email address.");
  }
  if (!isUserRole(role)) {
    throw new AuthError("invalid_input", "Select Admin or Staff as the role.");
  }

  return { fullName: normalizedName, email: normalizedEmail, role };
}

function requireCrypto(): Crypto {
  if (!globalThis.crypto?.subtle) {
    throw new AuthError(
      "crypto_unavailable",
      "This browser does not support the password protection required for demo users.",
    );
  }

  return globalThis.crypto;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function createSalt(): string {
  const salt = requireCrypto().getRandomValues(new Uint8Array(16));
  return bytesToHex(salt);
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const crypto = requireCrypto();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt),
      iterations: PASSWORD_HASH_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256,
  );

  return bytesToHex(new Uint8Array(hash));
}

function matchesHash(actual: string, expected: string): boolean {
  if (actual.length !== expected.length) {
    return false;
  }

  let difference = 0;
  for (let index = 0; index < actual.length; index += 1) {
    difference |= actual.charCodeAt(index) ^ expected.charCodeAt(index);
  }

  return difference === 0;
}

function createUserId(): string {
  return `demo-${bytesToHex(requireCrypto().getRandomValues(new Uint8Array(16)))}`;
}

function assertPassword(password: string): void {
  if (password.length < 8) {
    throw new AuthError(
      "invalid_input",
      "Use a password with at least 8 characters.",
    );
  }
}

function findPublicUser(
  userId: string,
  storedUsers: StoredDemoUser[],
): AuthUser | null {
  if (userId === DEFAULT_ADMIN.id) {
    return DEFAULT_ADMIN;
  }

  const storedUser = storedUsers.find((user) => user.id === userId);
  return storedUser ? toPublicUser(storedUser) : null;
}

export function createAuthService(repository: AuthRepository) {
  async function getSnapshot(): Promise<AuthSnapshot> {
    const storedUsers = await repository.loadUsers();
    const session = await repository.loadSession();

    if (!session) {
      return { user: null, users: toPublicUsers(storedUsers), expiresAt: null };
    }

    const user = findPublicUser(session.userId, storedUsers);
    if (!user || session.expiresAt <= Date.now()) {
      await repository.clearSession();
      return { user: null, users: toPublicUsers(storedUsers), expiresAt: null };
    }

    return {
      user,
      users: toPublicUsers(storedUsers),
      expiresAt: session.expiresAt,
    };
  }

  async function saveSession(userId: string): Promise<number> {
    const session: AuthSession = {
      userId,
      expiresAt: Date.now() + SESSION_LIFETIME_MS,
    };
    await repository.saveSession(session);
    return session.expiresAt;
  }

  return {
    getSnapshot,

    async login(email: string, password: string): Promise<AuthSnapshot> {
      const normalizedEmail = normalizeEmail(email);
      const storedUsers = await repository.loadUsers();
      let authenticatedUser: AuthUser | null = null;

      if (normalizedEmail === DEFAULT_ADMIN_CREDENTIALS.email) {
        if (password === DEFAULT_ADMIN_CREDENTIALS.password) {
          authenticatedUser = DEFAULT_ADMIN;
        }
      } else {
        const storedUser = storedUsers.find(
          (user) => normalizeEmail(user.email) === normalizedEmail,
        );

        if (
          storedUser &&
          matchesHash(
            await hashPassword(password, storedUser.passwordSalt),
            storedUser.passwordHash,
          )
        ) {
          authenticatedUser = toPublicUser(storedUser);
        }
      }

      if (!authenticatedUser) {
        throw new AuthError(
          "invalid_credentials",
          "The email or password you entered is incorrect.",
        );
      }

      const expiresAt = await saveSession(authenticatedUser.id);
      return {
        user: authenticatedUser,
        users: toPublicUsers(storedUsers),
        expiresAt,
      };
    },

    async logout(): Promise<void> {
      await repository.clearSession();
    },

    async createUser(input: NewDemoUser): Promise<AuthSnapshot> {
      const fields = validateUserFields(input.fullName, input.email, input.role);
      assertPassword(input.password);

      const storedUsers = await repository.loadUsers();
      const duplicateEmail = [DEFAULT_ADMIN.email, ...storedUsers.map((user) => user.email)]
        .some((email) => normalizeEmail(email) === fields.email);

      if (duplicateEmail) {
        throw new AuthError(
          "duplicate_email",
          "A user with this email address already exists.",
        );
      }

      const passwordSalt = createSalt();
      const newUser: StoredDemoUser = {
        id: createUserId(),
        ...fields,
        passwordSalt,
        passwordHash: await hashPassword(input.password, passwordSalt),
      };

      await repository.saveUsers([...storedUsers, newUser]);
      return getSnapshot();
    },

    async updateUser(
      userId: string,
      input: UpdatedDemoUser,
    ): Promise<AuthSnapshot> {
      if (userId === DEFAULT_ADMIN.id) {
        throw new AuthError(
          "default_user_protected",
          "The default demo admin account cannot be edited.",
        );
      }

      const fields = validateUserFields(input.fullName, input.email, input.role);
      if (input.password) {
        assertPassword(input.password);
      }

      const storedUsers = await repository.loadUsers();
      const existingUser = storedUsers.find((user) => user.id === userId);
      if (!existingUser) {
        throw new AuthError("user_not_found", "This demo user no longer exists.");
      }

      const duplicateEmail = [DEFAULT_ADMIN.email, ...storedUsers
        .filter((user) => user.id !== userId)
        .map((user) => user.email)]
        .some((email) => normalizeEmail(email) === fields.email);

      if (duplicateEmail) {
        throw new AuthError(
          "duplicate_email",
          "A user with this email address already exists.",
        );
      }

      const updatedUser: StoredDemoUser = { ...existingUser, ...fields };
      if (input.password) {
        updatedUser.passwordSalt = createSalt();
        updatedUser.passwordHash = await hashPassword(
          input.password,
          updatedUser.passwordSalt,
        );
      }

      await repository.saveUsers(
        storedUsers.map((user) => (user.id === userId ? updatedUser : user)),
      );
      return getSnapshot();
    },

    async deleteUser(userId: string): Promise<AuthSnapshot> {
      if (userId === DEFAULT_ADMIN.id) {
        throw new AuthError(
          "default_user_protected",
          "The default demo admin account cannot be deleted.",
        );
      }

      const storedUsers = await repository.loadUsers();
      if (!storedUsers.some((user) => user.id === userId)) {
        throw new AuthError("user_not_found", "This demo user no longer exists.");
      }

      await repository.saveUsers(
        storedUsers.filter((user) => user.id !== userId),
      );
      const session = await repository.loadSession();
      if (session?.userId === userId) {
        await repository.clearSession();
      }

      return getSnapshot();
    },
  };
}

export const authService = createAuthService(localStorageAuthRepository);

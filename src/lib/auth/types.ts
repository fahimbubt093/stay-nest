export type UserRole = "Admin" | "Staff";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isDefaultAdmin: boolean;
};

export type StoredDemoUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  passwordSalt: string;
  passwordHash: string;
};

export type AuthSession = {
  userId: string;
  expiresAt: number;
};

export type AuthSnapshot = {
  user: AuthUser | null;
  users: AuthUser[];
  expiresAt: number | null;
};

export type NewDemoUser = {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
};

export type UpdatedDemoUser = {
  fullName: string;
  email: string;
  password?: string;
  role: UserRole;
};

export const DEFAULT_ADMIN_ID = "default-admin";

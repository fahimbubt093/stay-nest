export type UserRole = "Admin" | "Staff";
export type AccountStatus = "Active" | "Inactive";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  phone?: string;
  profileImageUrl?: string;
  accountStatus: AccountStatus;
  isDefaultAdmin: boolean;
};

export type StoredDemoUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  phone?: string;
  profileImageUrl?: string;
  accountStatus?: AccountStatus;
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
  phone?: string;
  profileImageUrl?: string;
};

export type UpdatedDemoUser = {
  fullName: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  profileImageUrl?: string;
};

export const DEFAULT_ADMIN_ID = "default-admin";

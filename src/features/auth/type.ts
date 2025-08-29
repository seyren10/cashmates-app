import type { userRole } from "./schema";

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  google_id: null | string;
  avatar: null | string;
};

export type UserRole = (typeof userRole)[number];

import type z from "zod";
import type { loginCredentialSchema, userRole } from "./schema";
import type { AxiosError } from "axios";

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  google_id: null | string;
  avatar: null | string;
};

export type UserRole = (typeof userRole)[number];

export type LoginCredential = z.infer<typeof loginCredentialSchema>;

export type LaravelError = AxiosError<{ message: string }>;

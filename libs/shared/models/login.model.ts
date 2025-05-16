import { User } from "./user.model";
import { z } from "zod";

export interface LoginCredentials {
  email: string;
  password: string;
}

export type LoginResponse = { success: true, user: User } | { success: false, message: string };

export const LOGIN_CREDENTIALS_SCHEMA = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Invalid password' })
});

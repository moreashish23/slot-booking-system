import { z } from "zod";


export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Email must be valid"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password is too long"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Email must be valid")
    .max(254, "Email is too long"),
  password: z
    .string()
    .min(6, "Password must be between 6 and 128 characters")
    .max(128, "Password must be between 6 and 128 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

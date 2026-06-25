import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().email(),
    password: z.string().trim().min(2).max(16),
    city: z.string().trim().min(2).max(25).nullish(),
    profile_photo: z.string().nullish()
});

export type SignupDto =
    z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().trim().min(2).max(16)
});

export type LoginDto =
    z.infer<typeof loginSchema>;
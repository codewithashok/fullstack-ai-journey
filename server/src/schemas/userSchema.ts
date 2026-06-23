import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    city: z.string().min(2).max(100),
    profile_photo: z.string().nullish(),
});

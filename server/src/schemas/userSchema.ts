import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    city: z.string().min(2).max(100),
    profile_photo: z.string().nullish(),
});

export type CreateUserDto =
    z.infer<typeof createUserSchema>;

// Same as CreateUserDto for now (PUT requires full payload)
// Will become Partial<CreateUserDto> when PATCH is implemented
export type UpdateUserDto = CreateUserDto;

export type User = {
    id: number;
    name: string;
    email: string;
    city: string;
    profile_photo: string | null;
};
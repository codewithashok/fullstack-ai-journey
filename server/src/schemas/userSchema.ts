import { z } from 'zod';

const userSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    city: z.string().min(2).max(100),
});

export default userSchema;

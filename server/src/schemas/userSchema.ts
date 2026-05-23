import { z } from 'zod';

const userSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(2).max(100),
    age: z.number().min(0).optional()
});

export default userSchema;

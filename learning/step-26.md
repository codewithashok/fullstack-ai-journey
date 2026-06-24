# Step 26 — DTO Pattern & Strong Typing

## What is a DTO?

DTO = **Data Transfer Object**

It's just a TypeScript type that describes the shape of data coming **into** your API.

Think of it like a contract:

> "Hey, if you want to create a user, you MUST send me exactly these fields."

---

## The problem without DTOs

```ts
const createUser = async (req: Request, res: Response) => {
    const newUser = req.body; // newUser is 'any' — TypeScript has no idea what's inside
    await addUser(newUser);
}
```

`req.body` is typed as `any` by default.
TypeScript won't warn you if you accidentally do `newUser.naem` (typo).
You only find out at runtime — when a real user hits the API.

---

## The solution: DTOs

Define the shape once in `userSchema.ts`:

```ts
export const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    city: z.string().min(2).max(100),
    profile_photo: z.string().nullish(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
```

`z.infer` automatically creates a TypeScript type from your Zod schema.
You don't define the type twice — Zod and TypeScript stay in sync automatically.

---

## Now use it in the controller

```ts
const createUser = async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
    const newUser = req.body; // now TypeScript KNOWS what's inside
    await addUser(newUser);
}
```

Now if you type `newUser.naem` — TypeScript immediately shows a red error. 
Caught before runtime. 

---

## Separate DTOs for create vs update

```ts
export type CreateUserDto = z.infer<typeof createUserSchema>;

// Same fields for now (PUT needs full payload)
// Later becomes Partial<CreateUserDto> when we do PATCH
export type UpdateUserDto = CreateUserDto;
```

Why separate? Because **naming matters**.
`CreateUserDto` clearly belongs to the POST route.
`UpdateUserDto` clearly belongs to the PUT route.
Future you will thank you.

---

## The User type — what comes OUT of the database

```ts
export type User = {
    id: number;
    name: string;
    email: string;
    city: string;
    profile_photo: string | null;
};
```

This is different from `CreateUserDto` — the DB row has an `id`, the request body doesn't.

Use it to type your SQL query results:

```ts
const result = await pool.query<User>('SELECT * FROM users');
// result.rows → User[]  ✅ TypeScript knows the shape
```

---

## Summary

| Type | Used for | Has `id`? |
|------|----------|-----------|
| `CreateUserDto` | POST request body | No |
| `UpdateUserDto` | PUT request body | No |
| `User` | Database rows | Yes |

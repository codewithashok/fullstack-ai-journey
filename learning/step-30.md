# Step 30 — Async Error Wrapper

## The problem

Express doesn't automatically catch errors from `async` functions.

If you throw inside an async controller, Express never knows about it:

```ts
const getUserById = async (req, res) => {
    throw new AppError('User not found', 404);
    // Express won't catch this! The request just hangs.
};
```

You'd have to manually wrap everything in try/catch:

```ts
const getUserById = async (req, res, next) => {
    try {
        const user = await fetchUserById(id);
        res.send(user);
    } catch (err) {
        next(err); // manually forward to errorHandler
    }
};
```

This is repetitive. You'd have to do this in every single controller function.

---

## The solution: asyncHandler

```ts
export const asyncHandler =
    (fn: Function) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
```

It's a wrapper. You pass your controller function to it, and it automatically catches any error and forwards it to the `errorHandler` middleware.

---

## How to use it

In `usersRouter.ts`, wrap every route handler:

```ts
router.get('/', asyncHandler(getAllUsers));
router.post('/', validate(createUserSchema), asyncHandler(createUser));
router.get('/:id', asyncHandler(getUserById));
router.put('/:id', validate(createUserSchema), asyncHandler(updateUser));
router.delete('/:id', asyncHandler(deleteUser));
```

---

## Why `Promise.resolve()` instead of just `.catch()`?

```ts
// Risky — assumes fn always returns a Promise
fn(req, res, next).catch(next)

// Safe — works for both async and sync functions
Promise.resolve(fn(req, res, next)).catch(next)
```

`Promise.resolve()` wraps anything into a Promise.
If `fn` throws synchronously — it still gets caught.

---

## The full error journey now

```
Service:     throw new AppError('User not found', 404)
                ↓
asyncHandler: .catch(next) → next(err)
                ↓
errorHandler: sends { success: false, message: 'User not found' }
```

No try/catch. No repeated code. Clean controllers.

---

## Key lesson

`asyncHandler` is a one-time utility that makes all your async route handlers safe.
Wrap every controller in it and forget about try/catch forever.

# Step 25 — Global Error Handling Architecture

## The problem before

Error handling was scattered everywhere:

```ts
// in controller
if (!user) {
    res.status(404).send({ message: 'User not found' });
}

// in another controller
res.status(500).send({ message: 'Something went wrong' });
```

Every controller handled errors differently. Messy.

---

## The solution: centralized error handling

Three files work together:

```
src/
├── utils/
│   └── AppError.ts       ← custom error class
└── middleware/
    └── errorHandler.ts   ← one place that handles ALL errors
```

---

## AppError.ts — your custom error class

```ts
export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
```

Now instead of `res.status(404).send(...)` everywhere,
you just throw an error from anywhere:

```ts
throw new AppError('User not found', 404);
throw new AppError('Email already exists', 409);
throw new AppError('Something broke'); // defaults to 500
```

---

## errorHandler.ts — one middleware catches everything

```ts
export const errorHandler = (err, _req, res, _next) => {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // unexpected errors
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};
```

Register it in `index.ts` — **after all routes**:

```ts
app.use('/users', usersRouter);
app.use(errorHandler); // must be last
```

---

## Why 4 parameters in errorHandler?

Express identifies an error handler by the **number of parameters** — exactly 4.
If you write only 3, Express treats it as a normal middleware and errors won't reach it.

`_req` and `_next` are prefixed with `_` to say "I know these are unused, it's intentional."

---

## The flow now

```
throw new AppError('User not found', 404)
      ↓
asyncHandler catches it and calls next(err)
      ↓
errorHandler middleware receives it
      ↓
{ success: false, message: 'User not found' }  → sent to client
```

---

## Key lesson

Throw errors freely from anywhere (service, controller).
One central place handles all of them consistently.

---

## asyncHandler — the missing piece

Even with `AppError` and `errorHandler`, there's one problem.

Express doesn't automatically catch errors from `async` functions:

```ts
const getUserById = async (req, res) => {
    throw new AppError('User not found', 404);
    // Express never receives this! Request just hangs.
};
```

The fix is `asyncHandler`:

```ts
export const asyncHandler =
    (fn: Function) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
```

Wrap every route handler with it:

```ts
router.get('/:id', asyncHandler(getUserById));
```

Now any thrown error automatically reaches `errorHandler`. No try/catch needed anywhere.

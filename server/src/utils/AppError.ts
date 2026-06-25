// WHY DO WE NEED THIS?
//
// JavaScript's built-in Error class only carries a message:
//   throw new Error('User not found')
//
// But in an HTTP API, we also need a status code (404, 401, 400, etc.)
// to tell the client what kind of error it is. The built-in Error has no statusCode.
//
// AppError extends Error and adds statusCode, so we can throw meaningful HTTP errors
// from anywhere in the app:
//
//   throw new AppError('User not found', 404);
//   throw new AppError('Invalid email or password', 401);
//   throw new AppError('Email already in use', 409);
//
// These get caught by the global errorHandler middleware (errorHandler.ts), which
// checks: "is this an AppError?" — if yes, send that statusCode and message to the client.
// If it's a plain Error (unexpected crash), it sends 500 Internal Server Error instead.
//
// Error.captureStackTrace() makes the stack trace cleaner — it removes AppError's own
// constructor from the trace so you see exactly where the error was thrown in your code.
export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);

        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

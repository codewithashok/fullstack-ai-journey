// WHY DO WE NEED THIS?
//
// After the protect middleware verifies the JWT token, it attaches the logged-in
// user's info to the request object:
//   req.user = { id: 1, email: "ashok@example.com" }
//
// But TypeScript doesn't know that. By default, Express's Request type has no
// `user` property, so TypeScript would scream:
//   Property 'user' does not exist on type 'Request'
//
// This file EXTENDS Express's built-in Request interface to tell TypeScript:
//   "hey, req.user is a valid property and here's its shape"
//
// Now in any controller or middleware, you can safely write:
//   const userId = req.user?.id;   // TypeScript is happy ✓
//
// NOTE: This is a .d.ts (declaration) file — it's pure TypeScript types only.
// It produces ZERO JavaScript at runtime. It only helps TypeScript understand your code.
// The `export {}` at the bottom is required to make this a module so the
// global declaration works correctly.
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            };
        }
    }
}

export {};

// WHY DO WE NEED THIS?
//
// Before saving anything to the database, we need to make sure the incoming
// request body has the right data — correct types, required fields, no garbage.
//
// Without validate, anyone could send this and it would go straight to the DB:
//   { name: "", email: "not-an-email", city: 12345 }
//
// validate() takes a Zod schema (the rules) and checks the request body against it.
// Three things happen:
//
//   1. If data is INVALID  → immediately return 400 with details on what's wrong:
//        { success: false, errors: { email: ["Invalid email"] } }
//
//   2. If data is VALID    → req.body is replaced with the cleaned/parsed data
//        (Zod strips extra fields, trims strings, coerces types, etc.)
//
//   3. Call next()         → pass control to the actual controller
//
// USAGE (in a router):
//   router.post('/', validate(createUserSchema), asyncHandler(createUser));
//                    ^^^^^^^^^^^^^^^^^^^^^^^^^ runs before the controller
import {
  Request,
  Response,
  NextFunction
} from 'express';

import { ZodObject } from 'zod';

export function validate(schema: ZodObject<any>) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.flatten(
          issue => issue.message
        ).fieldErrors
      });
    }

    req.body = result.data;

    next();
  };
}
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
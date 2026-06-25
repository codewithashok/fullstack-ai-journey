import { Router } from 'express';
import { signup, login } from '../controllers/authController.js';
import { loginSchema, signupSchema } from '../schemas/authSchema.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/signup', validate(signupSchema), asyncHandler(signup));
router.post('/login', validate(loginSchema), asyncHandler(login));

export default router;

import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema } from '../schemas/userSchema.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, asyncHandler(getAllUsers));
router.post('/', protect, validate(createUserSchema), asyncHandler(createUser));
router.get('/:id', protect, asyncHandler(getUserById));
router.put('/:id', protect, validate(createUserSchema), asyncHandler(updateUser));
router.delete('/:id', protect, asyncHandler(deleteUser));

export default router;

import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema } from '../schemas/userSchema.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(getAllUsers));
router.post('/', validate(createUserSchema), asyncHandler(createUser));
router.get('/:id', asyncHandler(getUserById));
router.put('/:id', validate(createUserSchema), asyncHandler(updateUser));
router.delete('/:id', asyncHandler(deleteUser));

export default router;

import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema } from '../schemas/userSchema.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/', validate(createUserSchema), createUser);
router.get('/:id', getUserById);
router.put('/:id', validate(createUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;

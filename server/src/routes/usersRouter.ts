import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController.js';
import { validate } from '../middleware/validate.js';
import userSchema from '../schemas/userSchema.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/', validate(userSchema), createUser);
router.get('/:id', getUserById);
router.put('/:id', validate(userSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;

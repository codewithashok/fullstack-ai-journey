import { Router } from 'express';
import usersController from '../controllers/usersController.js';
import { validate } from '../middleware/validate.js';
import userSchema from '../schemas/userSchema.js';

const router = Router();

router.get('/', usersController.getAllUsers);
router.post('/', validate(userSchema), usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', validate(userSchema), usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

export default router;

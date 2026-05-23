import { Request, Response } from 'express';
import usersService from '../services/usersService.js';

const getAllUsers = async (req: Request, res: Response) => {
    const users = await usersService.fetchAllUsers();
    res.send(users);
}

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    const user = await usersService.fetchUserById(userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
}

const createUser = async (req: Request, res: Response) => {
    const newUser = req.body;
    await usersService.addUser(newUser);
    res.status(201).send({ message: 'User created successfully' });
}

const updateUser = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    const updatedData = req.body;
    await usersService.updateUser(userId, updatedData);
    res.send({ message: 'User updated successfully' });
}

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    await usersService.deleteUser(userId);
    res.send({ message: 'User deleted successfully' });
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
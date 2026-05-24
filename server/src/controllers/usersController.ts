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
    const createdUser = await usersService.addUser(newUser);
    res.status(201).send(createdUser);
}

const updateUser = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    const updatedData = req.body;
    const updatedUser = await usersService.updateUser(userId, updatedData);
    res.send(updatedUser);
}

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    const deletedUser = await usersService.deleteUser(userId);
    res.send(deletedUser);
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
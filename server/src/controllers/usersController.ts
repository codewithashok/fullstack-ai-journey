import { Request, Response } from 'express';
import { fetchAllUsers, fetchUserById, addUser, updateUser as updateUserById, deleteUser as deleteUserById } from '../services/usersService.js';

const getAllUsers = async (req: Request, res: Response) => {
    const users = await fetchAllUsers();
    res.send(users);
}

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    const user = await fetchUserById(userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
}

const createUser = async (req: Request, res: Response) => {
    const newUser = req.body;
    const createdUser = await addUser(newUser);
    res.status(201).send(createdUser);
}

const updateUser = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    const updatedData = req.body;
    const updatedUser = await updateUserById(userId, updatedData);
    res.send(updatedUser);
}

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    const deletedUser = await deleteUserById(userId);
    res.send(deletedUser);
}

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
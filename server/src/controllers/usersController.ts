import { Request, Response } from 'express';
import { fetchAllUsers, fetchUserById, addUser, updateUser as updateUserById, deleteUser as deleteUserById } from '../services/usersService.js';
import { CreateUserDto, UpdateUserDto } from '../schemas/userSchema.js';

const getAllUsers = async (req: Request, res: Response) => {
    const users = await fetchAllUsers();
    res.send(users);
}

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const userId = Number(req.params.id);
    const user = await fetchUserById(userId);
    res.send(user);
}

const createUser = async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
    const newUser = req.body;
    const createdUser = await addUser(newUser);
    res.status(201).send(createdUser);
}

const updateUser = async (req: Request<{ id: string }, {}, UpdateUserDto>, res: Response) => {
    const userId = Number(req.params.id);
    const updatedData = req.body;
    const updatedUser = await updateUserById(userId, updatedData);
    res.send(updatedUser);
}

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const userId = Number(req.params.id);
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
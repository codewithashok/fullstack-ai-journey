import { readFile, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import userSchema from '../schemas/userSchema.js';

type User = z.infer<typeof userSchema>;

const fetchAllUsers = async () => {
    const data = await readFile('./users.json', 'utf8');
    return JSON.parse(data) as User[];
}

const fetchUserById = async (userId: string) => {
    const users = await fetchAllUsers();
    return users.find(user => user.id === userId);
}

const addUser = async (user: User) => {
    const users = await fetchAllUsers();
    const newUser = { ...user, id: randomUUID() };
    users.push(newUser);
    await writeFile('./users.json', JSON.stringify(users, null, 2));
}

const updateUser = async (userId: string, updatedData: Partial<User>) => {
    const users = await fetchAllUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        await writeFile('./users.json', JSON.stringify(users, null, 2));
    }
}

const deleteUser = async (userId: string) => {
    const users = await fetchAllUsers();
    const updatedUsers = users.filter(user => user.id !== userId);
    await writeFile('./users.json', JSON.stringify(updatedUsers, null, 2));
}

export default {
    fetchAllUsers,
    fetchUserById,
    addUser,
    updateUser,
    deleteUser
}

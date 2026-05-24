import { z } from 'zod';
import { pool } from '../config/db.js';
import userSchema from '../schemas/userSchema.js';

type User = z.infer<typeof userSchema>;

const fetchAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

const fetchUserById = async (userId: string) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];
}

const addUser = async (user: User) => {
    const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [user.name, user.email]
    );
    return result.rows[0];
}

const updateUser = async (userId: string, updatedData: Partial<User>) => {
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [updatedData.name, updatedData.email, userId]
    );
    return result.rows[0];
}

const deleteUser = async (userId: string) => {
    const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [userId]
    );
    return result.rows[0];
}

export default {
    fetchAllUsers,
    fetchUserById,
    addUser,
    updateUser,
    deleteUser
}

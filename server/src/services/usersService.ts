import { z } from 'zod';
import { pool } from '../config/db.js';
import { createUserSchema } from '../schemas/userSchema.js';

type User = z.infer<typeof createUserSchema>;

const fetchAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

const fetchUserById = async (userId: number) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];
}

const addUser = async (user: User) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, city, profile_photo) VALUES ($1, $2, $3, $4) RETURNING *',
        [user.name, user.email, user.city, user.profile_photo ?? null]
    );
    return result.rows[0];
}

const updateUser = async (userId: number, updatedData: User) => {
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2, city = $3, profile_photo = $4 WHERE id = $5 RETURNING *',
        [updatedData.name, updatedData.email, updatedData.city, updatedData.profile_photo ?? null, userId]
    );
    return result.rows[0];
}

const deleteUser = async (userId: number) => {
    const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [userId]
    );
    return result.rows[0];
}

export {
    fetchAllUsers,
    fetchUserById,
    addUser,
    updateUser,
    deleteUser
}

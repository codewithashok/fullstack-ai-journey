import bcrypt from "bcrypt";
import { pool } from '../config/db.js';
import { AppError } from '../utils/AppError.js';
import { SignupDto } from "../schemas/authSchema.js";

type UserRecord = {
    id: number;
    name: string;
    email: string;
    password: string;
    city: string | null;
    profile_photo: string | null;
};

const loginService = async (email: string, password: string) => {
    const result = await pool.query<UserRecord>('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) throw new AppError('Invalid email or password', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError('Invalid email or password', 401);

    const { password: _, ...safeUser } = user;
    return safeUser;
};

const signupService = async (userData: SignupDto) => {
    const result = await pool.query<UserRecord>('SELECT id FROM users WHERE email = $1', [userData.email]);
    if (result.rows[0]) throw new AppError('User already exists', 409);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const insertResult = await pool.query<UserRecord>(
        'INSERT INTO users (name, email, password, city, profile_photo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userData.name, userData.email, hashedPassword, userData.city ?? null, userData.profile_photo ?? null]
    );
    const { password: _, ...user } = insertResult.rows[0];
    return user;
};

export { loginService, signupService };

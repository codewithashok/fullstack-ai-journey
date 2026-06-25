import { Request, Response } from 'express';
import { loginService, signupService } from '../services/authService.js';
import { generateToken } from '../utils/jwt.js';
import { SignupDto, LoginDto } from '../schemas/authSchema.js';

const signup = async (req: Request<{}, {}, SignupDto>, res: Response) => {
    const user = await signupService(req.body);
    res.status(201).json({ message: 'Account created successfully', user: { id: user.id, name: user.name, email: user.email } });
};

const login = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    const token = generateToken({ id: user.id, email: user.email });
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
};

export { signup, login };

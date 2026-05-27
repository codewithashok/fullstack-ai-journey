import { Router, Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(base64, { folder: 'users' });

    res.json({ url: result.secure_url });
});

export default router;

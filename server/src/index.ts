import express  from 'express';
import cors from 'cors';
import 'dotenv/config';
import './config/db.js';
import usersRouter from './routes/usersRouter.js';
import uploadRouter from './routes/uploadRouter.js';
import authRouter from './routes/authRouter.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use(errorHandler);
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

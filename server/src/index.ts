import express  from 'express';
import cors from 'cors';
import 'dotenv/config';
import './config/db.js';
import usersRouter from './routes/usersRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import { InfoLogger } from './utils/logger';
import cors from 'cors';
import morgan from 'morgan';
import Express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import APIRouter from './router';

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static/index.html'));
});

app.use('/api', protect, APIRouter);

app.post('/user', createNewUser);
app.post('/signin', signin);

app.listen(8080, () => {
  InfoLogger('Creativity starts with viewing the whole world differently');
});

import Express, { NextFunction, Request, Response } from 'express';
import { createNewUser, signin } from './handlers/user';

import APIRouter from './apirouter';
import { InfoLogger } from './utils/logger';
import cors from 'cors';
import defaultConfig from './config';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { protect } from './modules/auth';

dotenv.config();

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'static/index.html'));
});

app.use('/api', protect, APIRouter);

app.post('/user', createNewUser);
app.post('/signin', signin);

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.listen(defaultConfig.port, () => {
  InfoLogger(`API-Server is running on port ${defaultConfig.port}`);
});

export default app;

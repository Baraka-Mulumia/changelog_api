import { NextFunction, Response } from 'express';

import { IRequest } from '../types';
import { JWT_SECRET_KEY } from '../constants';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type Payload = {
  id: string;
  username: string;
};

export const createJWT = (user: Payload) => {
  const token = jwt.sign(user, JWT_SECRET_KEY);
  return token;
};

export const protect = (req: IRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const [_, token] = bearer.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET_KEY);
    req.user = user as Payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

import { prismaClient } from '../utils/dbConnect';
import { Response, Request } from 'express';
import { comparePassword, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prismaClient.user.create({
      data: {
        username,
        password: await hashPassword(password),
      },
    });

    const token = createJWT({ id: user.id, username: user.username });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Creating user failed', error });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { username: req.body.username },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await comparePassword(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createJWT({ id: user.id, username: user.username });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Creating user failed', error });
  }
};

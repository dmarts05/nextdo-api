import { Request, Response } from 'express';

import { loginService, registerService } from '../services/auth';
import {
  UserAlreadyRegisteredError,
  UserIncorrectPasswordError,
  UserNotFoundError,
} from '../utils/errors';

const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const result = await registerService(email, password, username);
    res.send(result);
  } catch (error) {
    if (error instanceof UserAlreadyRegisteredError) {
      return res.status(409).send({ error: (error as Error).message });
    } else {
      return res.status(500).send({ error: 'Something went wrong' });
    }
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.send(result);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).send({ error: (error as Error).message });
    } else if (error instanceof UserIncorrectPasswordError) {
      return res.status(401).send({ error: (error as Error).message });
    } else {
      return res.status(500).send({ error: 'Something went wrong' });
    }
  }
};

export { loginController, registerController };

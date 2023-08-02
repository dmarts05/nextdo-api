import { Request, Response } from 'express';

import { loginService, registerService } from '../services/auth';

const registerController = async (req: Request, res: Response) => {
  // TODO: Handle errors
  res.send(await registerService(req.body));
};

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // TODO: Handle errors
  res.send(await loginService({ email, password }));
};

export { loginController, registerController };

import { Router } from 'express';

import { loginController, registerController } from '../controllers/auth';
import { validateSchemaMiddleware } from '../middlewares/validate-schema';
import { loginSchema, registerSchema } from '../schemas/zod';

const router = Router();

router.post(
  '/register',
  validateSchemaMiddleware(registerSchema),
  registerController,
);

router.post('/login', validateSchemaMiddleware(loginSchema), loginController);

export { router };

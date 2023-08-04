import { NextFunction, Response } from 'express';

import { ExtendedRequest } from '../schemas/ext-req';
import { verifyJWT } from '../utils/jwt';

export const checkJWTMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const jwt = req.headers.authorization?.replace('Bearer ', '');
  if (!jwt) {
    res.status(401).send({
      error: 'Not authorized to access this resource. You need a JWT',
    });
    return;
  }

  const jwtPayload = verifyJWT(jwt);
  const userId =
    typeof jwtPayload === 'string' ? jwtPayload : jwtPayload.userId;
  if (!userId) {
    res.status(401).send({
      error: 'Not authorized to access this resource. You have an invalid JWT',
    });
    return;
  }

  req.userId = userId;
  next();
};

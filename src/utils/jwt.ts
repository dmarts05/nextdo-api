import { JwtPayload, sign, verify } from 'jsonwebtoken';

const JWT_SECRET = <string>process.env.JWT_SECRET;
const JWT_DAYS_TO_EXPIRE = process.env.JWT_DAYS_TO_EXPIRE || 7;

export const generateJWT = (userId: string): string => {
  const jwt = sign({ userId }, JWT_SECRET, {
    expiresIn: `${JWT_DAYS_TO_EXPIRE}d`,
  });
  return jwt;
};

export const verifyJWT = (jwt: string): JwtPayload | string => {
  return verify(jwt, JWT_SECRET);
};

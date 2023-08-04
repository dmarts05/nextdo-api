import { compare, hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 8);
};

export const verifyPassword = async (
  password: string,
  passwordHash: string,
) => {
  return await compare(password, passwordHash);
};

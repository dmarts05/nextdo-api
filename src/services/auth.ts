import UserModel from '../models/user';
import { AuthenticatedUser } from '../schemas/user';
import { hashPassword, verifyPassword } from '../utils/bcrypt';
import {
  UserAlreadyRegisteredError,
  UserIncorrectPasswordError,
  UserNotFoundError,
} from '../utils/errors';
import { generateJWT } from '../utils/jwt';

const registerService = async (
  email: string,
  password: string,
  username: string,
): Promise<AuthenticatedUser> => {
  // Check if user is already registered
  const isUserRegistered = !!(await UserModel.findOne({ email }));
  if (isUserRegistered) {
    throw new UserAlreadyRegisteredError('User already registered');
  }

  // Hash password and save user
  const hashedPassword = await hashPassword(password);
  const user = new UserModel({ email, password: hashedPassword, username });
  const savedUser = await user.save();

  // Create JWT for user
  const token = generateJWT(savedUser._id.toString());

  // Return user info and token
  return { email: savedUser.email, token, username: savedUser.username };
};

const loginService = async (
  email: string,
  password: string,
): Promise<AuthenticatedUser> => {
  // Check if user is registered
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new UserNotFoundError('User not found');
  }

  // Check if password is correct
  const hashedPassword = user.password;
  const isPasswordCorrect = await verifyPassword(password, hashedPassword);
  if (!isPasswordCorrect) {
    throw new UserIncorrectPasswordError('Incorrect password');
  }

  // Create JWT for user
  const token = generateJWT(user._id.toString());

  // Return user info and token
  return { email: user.email, token, username: user.username };
};

export { loginService, registerService };

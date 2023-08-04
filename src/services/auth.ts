import UserModel from '../models/user';
import { hashPassword } from '../utils/bcrypt';
import { UserAlreadyRegisteredError } from '../utils/errors';
import { generateJWT } from '../utils/jwt';

const registerService = async (
  email: string,
  password: string,
  username: string,
): Promise<{ email: string; token: string; username: string }> => {
  // Check if user is already registered
  const isUserRegistered = await UserModel.findOne({ email });
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

const loginService = async () => {};

export { loginService, registerService };

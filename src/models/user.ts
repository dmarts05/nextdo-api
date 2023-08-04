import { Schema, model } from 'mongoose';

import { User } from '../schemas/user';

const UserSchema = new Schema<User>(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    username: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = model('user', UserSchema);
export default UserModel;

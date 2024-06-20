import { UserTypeDocument } from '@app/types/user';
import { comparePassword, hashPassword } from '@app/utils/helper';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  telegramId: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.validatePassword = function (password: string) {
  return comparePassword(password, this.password);
};

const UserModel = model<UserTypeDocument>('User', userSchema);

export default UserModel;

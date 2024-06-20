import { CreateUserHandler } from '@app/controllers/user.controller';
import { isValid } from '@app/middlewares/is-valid';
import { UserSchema } from '@app/schema/user.schema';
import express from 'express';

const userRoute = express.Router();

userRoute.route('/').post(isValid(UserSchema), CreateUserHandler);

export default userRoute;

import { SignInHandler } from '@app/controllers/auth.controller';
import { isValid } from '@app/middlewares/is-valid';
import { LogInSchema } from '@app/schema/log-in.schema';
import express from 'express';

const authRoute = express.Router();

authRoute.route('/sign-in').post(isValid(LogInSchema), SignInHandler);

export default authRoute;

import { LogInSchema } from '@app/schema/log-in.schema';
import { ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';

export type LogInType = z.infer<typeof LogInSchema>;

export type JwtPayload = {
  id: ObjectId;
  username: string;
} & jwt.JwtPayload;

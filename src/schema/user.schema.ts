import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(8).max(32),
  telegramId: z.string().min(3),
});
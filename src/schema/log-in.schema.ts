import { z } from 'zod';

export const LogInSchema = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(1),
});
export type UserType = z.infer<typeof UserSchema>;

export type UserTypeDocument = {
  validatePassword(password: string): Promise<boolean>;
} & UserType &
  Document;

declare global {
  namespace Express {
    export interface Request {
      user?: UserTypeDocument;
    }
  }
}

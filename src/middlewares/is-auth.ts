import UserModel from '@app/models/user.model';
import { JwtPayload } from '@app/types/log-in';
import { verifyToken } from '@app/utils/helper';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Middleware function that checks if the request is authenticated.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Promise<void>} A promise that resolves when the authentication check is complete.
 */
export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('Authorization header not found');
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new Error('Invalid authorization type');
    }

    const payload = verifyToken(token) as JwtPayload;

    const user = await UserModel.findById(payload.id);

    req.user = user;
    next();
  } catch (error: unknown) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      code: StatusCodes.UNAUTHORIZED,
      success: false,
      message: 'Unauthorized',
      error: true,
      errorMessage: (error as Error).message,
    });
  }
};

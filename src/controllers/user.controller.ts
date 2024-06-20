import { createUser } from '@app/services/user.service';
import { UserType } from '@app/types/user';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * Creates a new user based on the provided request body.
 *
 * @param {Request} req - The Express request object containing the user data.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Promise<Response>} The JSON response with the created user data.
 */
export const CreateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: UserType = req.body;

    const user = await createUser(payload);

    return res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      success: true,
      message: ReasonPhrases.CREATED,
      error: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

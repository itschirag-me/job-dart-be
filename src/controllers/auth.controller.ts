import { signInUser } from '@app/services/auth.service';
import { LogInType } from '@app/types/log-in';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const SignInHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: LogInType = req.body;

    const user = await signInUser(payload);

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      success: true,
      message: ReasonPhrases.OK,
      error: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

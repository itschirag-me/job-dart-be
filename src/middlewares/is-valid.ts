import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Zod from 'zod';

/**
 * Middleware function that validates the request body against a Joi schema.
 *
 * @param {Zod.Schema} validationSchema - The Joi schema used for validation.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Promise<void>} A promise that resolves when the validation is complete.
 */
export const isValid = (validationSchema: Zod.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      validationSchema.parse(req.body);
      next();
    } catch (error: unknown) {
      console.log(error)
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: 400,
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        error: true,
        errorMessage: 'Invalid request body',
        data: error,
      });
    }
  };
};

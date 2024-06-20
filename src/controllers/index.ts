import { Exception } from '@app/types/exception';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * Handles the case when a requested resource is not found.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Response} The JSON response with the error details.
 */
export const NotFoundExceptionHandler = (req: Request, res: Response, _next: NextFunction) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    code: StatusCodes.NOT_FOUND,
    success: false,
    message: ReasonPhrases.NOT_FOUND,
    error: true,
    errorMessage: ReasonPhrases.NOT_FOUND,
  });
};

/**
 * Handles exceptions thrown during the execution of a request.
 *
 * @param {Exception} error - The exception object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Response} The JSON response with the error details.
 */
export const ExceptionHandler = (error: Exception, req: Request, res: Response, _next: NextFunction) => {
  return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
    code: error.code || StatusCodes.INTERNAL_SERVER_ERROR,
    success: false,
    message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    error: true,
    errorMessage: error.errorMessage || error.message,
  });
};

/**
 * Handles the health check request.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Response} The JSON response indicating the health status.
 */
export const HealthCheckHandler = (req: Request, res: Response, _next: NextFunction) => {
  return res.status(StatusCodes.OK).json({
    code: StatusCodes.OK,
    success: true,
    message: ReasonPhrases.OK,
    error: false,
  });
};

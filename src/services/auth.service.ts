import config from '@app/config';
import UserModel from '@app/models/user.model';
import { Exception } from '@app/types/exception';
import { JwtPayload, LogInType } from '@app/types/log-in';
import { generateAccessToken, generateRefreshToken } from '@app/utils/helper';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * Sign in a user with the provided login credentials.
 *
 * @param {LogInType} payload - The login credentials of the user.
 * @return {Promise<{ token: string; refreshToken: string; expiresAt: number }>} - An object containing the generated access token, refresh token, and expiration time.
 * @throws {Exception} - If the username or password is incorrect.
 */
export const signInUser = async (
  payload: LogInType,
): Promise<{ token: string; refreshToken: string; expiresAt: number }> => {
  /**
   * Find the user in the database.
   */
  const user = await UserModel.findOne({ username: payload.username }).select('+password').exec();
  console.log('USER', user);
  if (!user) {
    const error = new Error(ReasonPhrases.UNAUTHORIZED) as Exception;
    error.code = StatusCodes.UNAUTHORIZED;
    error.errorMessage = 'Username is incorrect';
    throw error;
  }

  /**
   * Validate the password.
   */
  const isMatch = await user.validatePassword(payload.password);

  if (!isMatch) {
    const error = new Error(ReasonPhrases.UNAUTHORIZED) as Exception;
    error.code = StatusCodes.UNAUTHORIZED;
    error.errorMessage = 'Password is incorrect';
    throw error;
  }

  const jwtPayload: JwtPayload = {
    id: user._id,
    username: user.username,
  };

  const token = generateAccessToken(jwtPayload);
  const expiresAt = config.env.jwtExpiry;

  const refreshToken = generateRefreshToken(jwtPayload);

  return {
    token,
    expiresAt,
    refreshToken,
  };
};

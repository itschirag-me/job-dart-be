import config from '@app/config';
import { JwtPayload } from '@app/types/log-in';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password to be hashed.
 * @return {Promise<string>} A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compares a given password with a hashed password using bcrypt.
 *
 * @param {string} password - The password to compare.
 * @param {string} hash - The hashed password to compare against.
 * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

/**
 * Generates an access token using the provided payload.
 *
 * @param {JwtPayload} payload - The payload to be encoded in the access token.
 * @return {string} The generated access token.
 */
export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, config.env.jwtSecret, { expiresIn: config.env.jwtExpiry });
};

/**
 * Generates a refresh token using the provided payload.
 *
 * @param {JwtPayload} payload - The payload to be encoded in the refresh token.
 * @return {string} The generated refresh token.
 */
export const generateRefreshToken = (payload: JwtPayload) => {
  return jwt.sign(payload, config.env.jwtRefreshSecret, { expiresIn: config.env.jwtRefreshExpiry });
};

/**
 * Verifies a JWT token using the provided secret.
 *
 * @param {string} token - The JWT token to verify.
 * @return {Promise<object>} A promise that resolves to the decoded token payload if the verification is successful.
 * @throws {JsonWebTokenError} If the token is invalid or if it has expired.
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, config.env.jwtSecret);
};

/**
 * Verifies a refresh token using the provided secret.
 *
 * @param {string} token - The refresh token to verify.
 * @return {Promise<object>} A promise that resolves to the decoded token payload if the verification is successful.
 * @throws {JsonWebTokenError} If the token is invalid or if it has expired.
 */
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.env.jwtRefreshSecret);
};

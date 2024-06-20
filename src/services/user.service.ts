import UserModel from '@app/models/user.model';
import { Exception } from '@app/types/exception';
import { UserType, UserTypeDocument } from '@app/types/user';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * Creates a new user with the provided payload.
 *
 * @param {UserType} payload - The user data to be created.
 * @return {Promise<UserTypeDocument>} - The newly created user.
 * @throws {Exception} - If a user with the same username or telegramId already exists.
 */
export const createUser = async (payload: UserType): Promise<UserTypeDocument> => {
  const user = await UserModel.findOne({ $or: [{ username: payload.username }, { telegramId: payload.telegramId }] });

  if (user) {
    const error = new Error(ReasonPhrases.CONFLICT) as Exception;
    error.code = StatusCodes.CONFLICT;
    error.errorMessage = 'Username or Telegram ID already exists';
    throw error;
  }

  const newUser = new UserModel(payload);
  await newUser.save();
  return newUser;
};

/**
 * Fetches a user document by their ID from the database.
 *
 * @param {string} id - The ID of the user to fetch.
 * @return {Promise<UserTypeDocument>} A promise that resolves to the user document if found, or throws an exception if not found.
 */
export const fetchUserById = async (id: string): Promise<UserTypeDocument> => {
  const user = await UserModel.findById(id);
  if (!user) {
    const error = new Error(ReasonPhrases.NOT_FOUND) as Exception;
    error.code = StatusCodes.NOT_FOUND;
    error.errorMessage = 'User not found';
    throw error;
  }
  return user;
};

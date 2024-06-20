import dotenv from 'dotenv';

const envPath = `${process.cwd()}/env/.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });

/**
 * Configuration object containing environment variables.
 * @type {{env: {port: number, mongoUri: string, jwtSecret: string, jwtExpiry: number}, corsOption: {origin: string[], methods: string, preflightContinue: boolean, optionsSuccessStatus: number}}}
 */
export default {
  env: {
    port: parseInt(process.env.PORT!) || 3000,
    mongoUri: process.env.MONGO_URI!,
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiry: parseInt(process.env.JWT_EXPIRY!),

    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    jwtRefreshExpiry: parseInt(process.env.JWT_REFRESH_EXPIRY!),
  },
  corsOption: {
    origin: ['http://localhost:*', 'http://127.0.0.1:*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
};

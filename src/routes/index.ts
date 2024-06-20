import { HealthCheckHandler } from '@app/controllers';
import express from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';

const apiRoute = express.Router();

/**
 * Health check
 */
apiRoute.route('/health').all(HealthCheckHandler);

/**
 * User route
 */
apiRoute.use('/user', userRoute);

/**
 * Auth route
 */
apiRoute.use('/auth', authRoute);

export default apiRoute;

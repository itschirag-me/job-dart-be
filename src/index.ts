import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import config from '@app/config';
import { ExceptionHandler, NotFoundExceptionHandler } from '@app/controllers';
import apiRoute from './routes';

express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors(config.corsOption))
  .use('/api', apiRoute)
  .use(ExceptionHandler)
  .use(NotFoundExceptionHandler)
  .listen(config.env.port, async () => {
    try {
      const mongo = await mongoose.connect(config.env.mongoUri);
      console.log(`MongoDB connected: ${mongo.connection.name}`);
    } catch (error) {
      console.error(error);
    }
  });

import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/container';

import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';

import upload from '@config/upload';
import { AppError } from '@shared/errors/AppError';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };

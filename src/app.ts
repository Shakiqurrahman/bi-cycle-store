import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { MAX_JSON_SIZE } from './config/config';
import { router } from './routes';
import errorHandler from './utils/ErrorHandler';

export const app = express();

//middlewares
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(
    cors({
        origin: '*',
        credentials: true,
    }),
);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.use('/api', router);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Resource not found');
    error.name = 'Not Found';
    next(error);
});

// Global Error handler
app.use(errorHandler);

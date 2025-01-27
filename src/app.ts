import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { config } from './config/config';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes/route';

export const app = express();

//middlewares
app.use(express.json({ limit: config.MAX_JSON_SIZE }));
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
app.use(globalErrorHandler);

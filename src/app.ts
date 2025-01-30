import cors from 'cors';
import express, { Request, Response } from 'express';
import { config } from './config/config';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
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

app.use('/api/v1', router);

// Not Found Handler [should be after all routes]
app.use(notFound);

// Global Error handler
app.use(globalErrorHandler);

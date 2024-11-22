import cors from 'cors';
import express, { Request, Response } from 'express';
import { MAX_JSON_SIZE } from './config/config';
import { router } from './routes';

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

app.use('/api', router)
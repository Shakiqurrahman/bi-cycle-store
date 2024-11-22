import { Router } from 'express';
import { productsRouter } from '../modules/productsRoute';

export const router = Router();

router.use('/products', productsRouter);

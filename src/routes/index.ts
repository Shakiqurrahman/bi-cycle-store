import { Router } from 'express';
import { productRouter } from '../modules/product/productRoute';

export const router = Router();

router.use('/products', productRouter);

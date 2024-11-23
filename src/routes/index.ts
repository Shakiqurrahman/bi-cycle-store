import { Router } from 'express';
import { OrderRouter } from '../modules/order/OrderRoute';
import { productRouter } from '../modules/product/productRoute';

export const router = Router();

// product router
router.use('/products', productRouter);

// order router
router.use('/orders', OrderRouter);

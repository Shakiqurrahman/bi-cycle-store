import { Router } from 'express';
import { orderControllers } from './OrderController';

const router = Router();

// Order a Bicycle
router.post('/', orderControllers.orderABicycle);

// Calculate Revenue from Orders
router.get('/revenue', orderControllers.getRevenue);

export const OrderRoutes = router;

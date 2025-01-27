import { Router } from 'express';
import { authRoutes } from '../modules/Auth/authRoute';
import { OrderRoutes } from '../modules/order/OrderRoute';
import { productRoutes } from '../modules/product/productRoute';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/product',
        route: productRoutes,
    },
    {
        path: '/order',
        route: OrderRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

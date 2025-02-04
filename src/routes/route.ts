import { Router } from 'express';
import { authRoutes } from '../modules/Auth/authRoute';
import { OrderRoutes } from '../modules/order/OrderRoute';
import { productRoutes } from '../modules/product/productRoute';
import { userRoutes } from '../modules/User/userRoute';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/products',
        route: productRoutes,
    },
    {
        path: '/orders',
        route: OrderRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

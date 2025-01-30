import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/userConstant';
import { orderControllers } from './OrderController';

const router = Router();

// Order a Bicycle
router.post(
    '/order/create',
    auth(USER_ROLE.customer),
    orderControllers.orderABicycle,
);

router.get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    orderControllers.getAllOrders,
);

router.get(
    '/orderId',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    orderControllers.getOrderById,
);

router.patch(
    '/orderId/cancel',
    auth(USER_ROLE.customer),
    orderControllers.orderCancelByUser,
);

router.patch(
    '/orderId/status/update',
    auth(USER_ROLE.admin),
    orderControllers.orderUpdateByAdmins,
);

// Calculate Revenue from Orders
router.get('/revenue', auth(USER_ROLE.admin), orderControllers.getRevenue);

export const OrderRoutes = router;

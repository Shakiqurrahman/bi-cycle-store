import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './userConstant';
import { userController } from './userController';

const router = Router();

router.get(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    userController.getUserById,
);
router.get(
    '/update',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    userController.getUserById,
);
router.get(
    '/change-password',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    userController.changePassword,
);

export const userRoutes = router;

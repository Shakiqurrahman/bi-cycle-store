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
router.patch(
    '/update',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    userController.getUserById,
);
router.post(
    '/change-password',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    userController.changePassword,
);
router.patch('/:userId/block', auth(USER_ROLE.admin), userController.blockUser);

export const userRoutes = router;

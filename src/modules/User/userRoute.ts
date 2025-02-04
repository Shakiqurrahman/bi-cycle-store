import { Router } from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/multer';
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
    upload.single('avatar'),
    userController.updateUser,
);
router.post(
    '/change-password',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    userController.changePassword,
);
router.patch('/:userId/status', auth(USER_ROLE.admin), userController.blockUser);
router.get('/', auth(USER_ROLE.admin), userController.getAllUsers);

export const userRoutes = router;

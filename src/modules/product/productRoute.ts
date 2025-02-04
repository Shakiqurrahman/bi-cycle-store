import { Router } from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/multer';
import { USER_ROLE } from '../User/userConstant';
import { productController } from './productController';

const router = Router();

// Create a Bicycle
router.post(
    '/',
    upload.single('imageUrl'),
    auth(USER_ROLE.admin),
    productController.createABicycle,
);

// Get All Bicycles
router.get('/', productController.getAllBicycles);

// Get a Specific Bicycle
router.get('/:productId', productController.getBicycleById);

// Update a Bicycle
router.put(
    '/:productId',
    auth(USER_ROLE.admin),
    productController.updateBicycleById,
);

// Delete a Bicycle
router.delete(
    '/:productId',
    auth(USER_ROLE.admin),
    productController.deleteBicycleById,
);

export const productRoutes = router;

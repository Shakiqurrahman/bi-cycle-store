import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/userConstant';
import { productController } from './productController';

const router = Router();

// Create a Bicycle
router.post('/', auth(USER_ROLE.admin), productController.createABicycle);

// Get All Bicycles
router.get('/', productController.getAllBicycles);

// Get a Specific Bicycle
router.get(
    '/:productId',
    auth(USER_ROLE.admin),
    productController.getBicycleById,
);

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

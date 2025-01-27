import { Router } from 'express';
import { productController } from './productController';

const router = Router();

// Create a Bicycle
router.post('/', productController.createABicycle);

// Get All Bicycles
router.get('/', productController.getAllBicycles);

// Get a Specific Bicycle
router.get('/:productId', productController.getBicycleById);

// Update a Bicycle
router.put('/:productId', productController.updateBicycleById);

// Delete a Bicycle
router.delete('/:productId', productController.deleteBicycleById);

export const productRoutes = router;

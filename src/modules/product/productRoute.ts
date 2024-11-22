import { Router } from 'express';
import { productController } from './productController';

const router = Router();

// Create a Bicycle
router.post('/', productController.createABicycle);

// Get All Bicycles
router.get('/', productController.getAllBicycles);

// Get a Specific Bicycle
router.get('/:productId', productController.getAllBicycles);

// Update a Bicycle
router.put('/:productId', productController.getAllBicycles);

// Delete a Bicycle
router.delete('/:productId', productController.getAllBicycles);

export const productRouter = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const productController_1 = require("./productController");
const router = (0, express_1.Router)();
// Create a Bicycle
router.post('/', productController_1.productController.createABicycle);
// Get All Bicycles
router.get('/', productController_1.productController.getAllBicycles);
// Get a Specific Bicycle
router.get('/:productId', productController_1.productController.getBicycleById);
// Update a Bicycle
router.put('/:productId', productController_1.productController.updateBicycleById);
// Delete a Bicycle
router.delete('/:productId', productController_1.productController.deleteBicycleById);
exports.productRoutes = router;

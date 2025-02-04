"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const multer_1 = require("../../middlewares/multer");
const userConstant_1 = require("../User/userConstant");
const productController_1 = require("./productController");
const router = (0, express_1.Router)();
// Create a Bicycle
router.post('/', multer_1.upload.single('imageUrl'), (0, auth_1.default)(userConstant_1.USER_ROLE.admin), productController_1.productController.createABicycle);
// Get All Bicycles
router.get('/', productController_1.productController.getAllBicycles);
// Get a Specific Bicycle
router.get('/:productId', productController_1.productController.getBicycleById);
// Update a Bicycle
router.put('/:productId', (0, auth_1.default)(userConstant_1.USER_ROLE.admin), multer_1.upload.single('imageUrl'), productController_1.productController.updateBicycleById);
// Delete a Bicycle
router.delete('/:productId', (0, auth_1.default)(userConstant_1.USER_ROLE.admin), productController_1.productController.deleteBicycleById);
exports.productRoutes = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const productService_1 = require("./productService");
const productValidation_1 = require("./productValidation");
const createABicycle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = productValidation_1.productValidationSchema.parse(req.body);
        const newBicycle = yield productService_1.productServices.createBicycleIntoDB(validatedData);
        res.status(200).json({
            message: 'Bicycle created successfully',
            status: true,
            data: newBicycle,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllBicycles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicycles = yield productService_1.productServices.getAllBicyclesFromDB();
        res.status(200).json({
            message: 'Bicycles retrieved successfully',
            status: true,
            data: bicycles,
        });
    }
    catch (error) {
        next(error);
    }
});
const getBicycleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const bicycle = yield productService_1.productServices.getBicycleByIdFromDB(productId);
        res.status(200).json({
            message: 'Bicycle retrieved successfully',
            status: true,
            data: bicycle,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateBicycleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const validatedData = productValidation_1.productUpdateValidationSchema.parse(req.body);
        const updatedBicycle = yield productService_1.productServices.updateBicycleFromDB(productId, validatedData);
        res.status(200).json({
            message: 'Bicycle updated successfully',
            status: true,
            data: updatedBicycle,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteBicycleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield productService_1.productServices.deleteBicycleFromDB(productId);
        res.status(200).json({
            message: 'Bicycle deleted successfully',
            status: true,
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
exports.productController = {
    createABicycle,
    getAllBicycles,
    getBicycleById,
    updateBicycleById,
    deleteBicycleById,
};

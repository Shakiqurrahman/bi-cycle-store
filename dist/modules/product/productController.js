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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const cloudinary_1 = require("../../utils/cloudinary");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const productService_1 = require("./productService");
const productValidation_1 = require("./productValidation");
const createABicycle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = productValidation_1.productValidationSchema.parse(req.body);
    let imageUrl = undefined;
    if (req.file) {
        const uploadResult = yield (0, cloudinary_1.uploadToCloudinary)(req.file.path);
        imageUrl = uploadResult.secure_url;
        if (!uploadResult) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Upload failed');
        }
    }
    const newBicycle = yield productService_1.productServices.createBicycleIntoDB(Object.assign(Object.assign({ imageUrl }, validatedData), { price: Number(validatedData.price), quantity: Number(validatedData.quantity) }));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bicycle created successfully',
        data: newBicycle,
    });
}));
const getAllBicycles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bicycles = yield productService_1.productServices.getAllBicyclesFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bicycles retrieved successfully',
        data: bicycles,
    });
}));
const getBicycleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const bicycle = yield productService_1.productServices.getBicycleByIdFromDB(productId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bicycle retrieved successfully',
        data: bicycle,
    });
}));
const updateBicycleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const validatedData = productValidation_1.productUpdateValidationSchema.parse(req.body);
    const updatedBicycle = yield productService_1.productServices.updateBicycleFromDB(productId, Object.assign(Object.assign({}, validatedData), { price: Number(validatedData.price), quantity: Number(validatedData.quantity) }));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bicycle updated successfully',
        data: updatedBicycle,
    });
}));
const deleteBicycleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    yield productService_1.productServices.deleteBicycleFromDB(productId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bicycle deleted successfully',
        data: {},
    });
}));
exports.productController = {
    createABicycle,
    getAllBicycles,
    getBicycleById,
    updateBicycleById,
    deleteBicycleById,
};

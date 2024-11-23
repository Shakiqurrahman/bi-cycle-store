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
exports.productServices = void 0;
const productModel_1 = require("./productModel");
const createBicycleIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productModel_1.Product.create(productData);
    return result;
});
const getAllBicyclesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productModel_1.Product.find();
    return result;
});
const getBicycleByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const bicycle = yield productModel_1.Product.findById(productId);
    if (!bicycle) {
        throw new Error('Bicycle not found');
    }
    return bicycle;
});
const updateBicycleFromDB = (productId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBicycle = yield productModel_1.Product.findByIdAndUpdate(productId, updatedData, {
        new: true,
        runValidators: true,
    });
    if (!updatedBicycle) {
        throw new Error('Bicycle not found');
    }
    return updatedBicycle;
});
const deleteBicycleFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productModel_1.Product.findByIdAndDelete(productId);
    if (!result) {
        throw new Error('Bicycle not found');
    }
    return result;
});
exports.productServices = {
    createBicycleIntoDB,
    getAllBicyclesFromDB,
    getBicycleByIdFromDB,
    updateBicycleFromDB,
    deleteBicycleFromDB,
};

import { TBicycle } from './productInterface';
import { Product } from './productModel';

const createBicycleIntoDB = async (productData: TBicycle) => {
    const result = await Product.create(productData);
    return result;
};

const getAllBicyclesFromDB = async () => {
    const result = await Product.find();
    return result;
};

const getBicycleByIdFromDB = async (productId: string) => {
    const bicycle = await Product.findById(productId);
    if (!bicycle) {
        throw new Error('Bicycle not found');
    }
    return bicycle;
};

const updateBicycleFromDB = async (
    productId: string,
    updatedData: Partial<TBicycle>,
) => {
    const updatedBicycle = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        {
            new: true,
            runValidators: true,
        },
    );

    if (!updatedBicycle) {
        throw new Error('Bicycle not found');
    }

    return updatedBicycle;
};

const deleteBicycleFromDB = async (productId: string) => {
    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
        throw new Error('Bicycle not found');
    }
    return result;
};

export const productServices = {
    createBicycleIntoDB,
    getAllBicyclesFromDB,
    getBicycleByIdFromDB,
    updateBicycleFromDB,
    deleteBicycleFromDB,
};

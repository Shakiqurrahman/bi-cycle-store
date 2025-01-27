import mongoose from 'mongoose';
import { config } from '../config/config';

export const connectDb = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI as string);
        console.log(`\nMongoDB Connected !! \n`);
    } catch (error) {
        console.log('MONGODB connection FAILED!! ', error);
        process.exit(1); //current process will stop!! - [node js]
    }
};

import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/config';

export const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI as string);
    console.log(`\nMongoDB Connected !! \n`);
  } catch (error) {
    console.log('MONGODB connection FAILED!! ', error);
    process.exit(1); //current process will stop!! - [node js]
  }
};

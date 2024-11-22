import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 5000;
export const MAX_JSON_SIZE = "30mb";
export const MONGODB_URI = process.env.MONGODB_URI;
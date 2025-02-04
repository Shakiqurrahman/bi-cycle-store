import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadResult {
    secure_url: string;
}

export const uploadToCloudinary = async (
    filePath: string,
): Promise<UploadResult> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            transformation: [
                { width: 800, crop: 'limit' },
                { quality: 'auto' },
                { fetch_format: 'auto' },
            ],
        });

        return { secure_url: result.secure_url };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Error uploading image to Cloudinary');
    } finally {
        fs.unlinkSync(filePath);
    }
};

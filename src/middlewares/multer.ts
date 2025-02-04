import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cb(new Error('Only image files are allowed') as any, false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
});

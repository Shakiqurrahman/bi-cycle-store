import { NextFunction, Request, Response, Router } from 'express';
import { productValidationSchema } from './productValidation';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Products fetched successfully! using products router',
    });
});
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const validatedData = productValidationSchema.parse(req.body);
    try {
        res.json({
            message: 'Products fetched successfully! using products router',
            data: validatedData,
        });
    } catch (error) {
        next(error);
    }
});

export const productRouter = router;

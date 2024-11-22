import { Request, Response, Router } from 'express';

const router = Router();

router.get('/products', (req: Request, res: Response) => {
  res.json({ message: 'Products fetched successfully!' });
});

export const productsRouter = router;

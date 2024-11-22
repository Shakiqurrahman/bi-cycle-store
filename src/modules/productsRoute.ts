import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Products fetched successfully! using products router' });
});

export const productsRouter = router;

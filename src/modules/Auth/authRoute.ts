import { Router } from 'express';
import { authControllers } from './authController';

const router = Router();

router.post('/register', authControllers.registerUser);
router.post('/login', authControllers.loginUser);
router.post('/refresh-token', authControllers.refreshToken);
router.post('/logout', authControllers.logoutUser);

export const authRoutes = router;

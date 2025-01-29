import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AuthValidations } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validationRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser,
);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;

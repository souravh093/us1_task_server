import { Router } from 'express';
import auth from '../../middlewares/auth';
import { RoleEnum } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { SessionValidations } from './session.validation';
import { SessionController } from './session.controller';

const router = Router();

router.post(
  '/',
  auth(RoleEnum.USER),
  validationRequest(SessionValidations.createSessionValidationSchema),
  SessionController.createSession,
);

router.get(
  '/',
//   auth(RoleEnum.USER, RoleEnum.ADMIN),
  SessionController.getSessions,
);

router.get(
  '/:id',
  auth(RoleEnum.USER, RoleEnum.ADMIN),
  SessionController.getSessionById,
);

router.put(
  '/:id',
  auth(RoleEnum.USER),
  validationRequest(SessionValidations.updateSessionValidationSchema),
  SessionController.updateSession,
);

router.delete(
  '/:id',
  auth(RoleEnum.USER, RoleEnum.ADMIN),
  SessionController.deleteSession,
);

export const SessionRoutes = router;

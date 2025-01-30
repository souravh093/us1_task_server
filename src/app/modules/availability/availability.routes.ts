import { Router } from 'express';
import auth from '../../middlewares/auth';
import { RoleEnum } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { AvailabilityValidations } from './availability.validation';
import { AvailabilityController } from './availability.controller';

const router = Router();

router.post(
  '/',
  auth(RoleEnum.USER),
  validationRequest(AvailabilityValidations.createAvailabilityValidationSchema),
  AvailabilityController.createAvailability,
);

router.delete(
  '/:id',
  auth(RoleEnum.USER),
  AvailabilityController.deleteAvailability,
);

export const AvailabilityRoutes = router;

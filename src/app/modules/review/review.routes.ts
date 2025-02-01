import { Router } from 'express';
import auth from '../../middlewares/auth';
import { RoleEnum } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { ReviewValidations } from './review.validation';
import { ReviewController } from './review.controller';

const router = Router();

router.post(
  '/',
  auth(RoleEnum.USER),
  validationRequest(ReviewValidations.createReviewValidationSchema),
  ReviewController.createReview,
);

router.get(
  '/',
  auth(RoleEnum.USER, RoleEnum.ADMIN),
  ReviewController.getReviews,
);

export const ReviewRoutes = router;

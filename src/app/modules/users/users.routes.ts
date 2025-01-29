import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { UserValidations } from './users.validation';
import { UserController } from './users.controller';
import auth from '../../middlewares/auth';
import { RoleEnum } from '@prisma/client';

const router = Router();

router.post(
  '/',
  validationRequest(UserValidations.createUserValidationSchema),
  UserController.createUser,
);

router.get('/', auth(RoleEnum.ADMIN), UserController.getUsers);

router.get(
  '/:email',
  auth(RoleEnum.ADMIN, RoleEnum.USER),
  UserController.getUserByEmail,
);

router.put(
  '/:id',
  auth(RoleEnum.ADMIN, RoleEnum.USER),
  UserController.updateUser,
);

router.delete('/:id', auth(RoleEnum.ADMIN), UserController.deleteUser);

export const UserRoutes = router;

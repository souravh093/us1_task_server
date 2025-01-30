import { Router } from 'express';
import auth from '../../middlewares/auth';
import { RoleEnum } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { SkillValidations } from './skills.validation';
import { SkillController } from './skills.controller';

const router = Router();

router.post(
  '/',
  auth(RoleEnum.USER),
  validationRequest(SkillValidations.createSkillValidationSchema),
  SkillController.createSkill,
);

router.get('/', auth(RoleEnum.USER, RoleEnum.ADMIN), SkillController.getSkills);

router.get(
  '/:id',
  SkillController.getSkillById,
);

router.put(
  '/:id',
  auth(RoleEnum.USER),
  validationRequest(SkillValidations.updateSkillValidationSchema),
  SkillController.updateSkill,
);

router.delete('/:id', auth(RoleEnum.USER), SkillController.deleteSkill);

export const SkillRoutes = router;

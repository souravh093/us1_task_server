import { Router } from 'express';
import { UserRoutes } from '../modules/users/users.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { SkillRoutes } from '../modules/skills/skills.routes';
import { AvailabilityRoutes } from '../modules/availability/availability.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/skills',
    route: SkillRoutes,
  },
  {
    path: '/availability',
    route: AvailabilityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

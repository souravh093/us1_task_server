import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import config from './app/config';
import notFoundRoute from './app/middlewares/notFoundRoutes';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/golobalErrorHandler';
import { seedAdminUser } from './db/db.config';

const app: Application = express();

// middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  }),
);
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({
    message: 'SkillSync server is  running 🏃‍♀️‍➡️🏃‍♀️‍➡️🏃‍♀️‍➡️',
  });
});

// routes
app.use('/api/v1', router);

app.use(notFoundRoute);
app.use(globalErrorHandler);

app.listen(config.port, () => {
  seedAdminUser();
  console.log(`SkillSync Server is listening on port:${config.port} 😎`);
});

import { PrismaClient, RoleEnum } from '@prisma/client';
import config from '../app/config';
import bcryptjs from 'bcryptjs';
const prisma: PrismaClient = new PrismaClient();

export default prisma;

const adminUser = {
  id: 'b9173f97-4d26-4aab-b905-a48f83eea75e',
  role: RoleEnum.ADMIN,
  name: 'Sourave Halder',
  profilePhoto:
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  email: config.adminEmail || '',
  password: config.adminPass || '',
};

export const seedAdminUser = async () => {
  const isAdminUserExists = await prisma.user.findFirst({
    where: {
      email: config.adminEmail,
    },
  });

  if (!isAdminUserExists) {
    adminUser.password = await bcryptjs.hash(adminUser.password, 10);
    await prisma.user.create({
      data: adminUser,
    });
  }
};

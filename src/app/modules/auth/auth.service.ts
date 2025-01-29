import { User } from '@prisma/client';
import prisma from '../../../db/db.config';
import bcrypt from 'bcryptjs';
import AppError from '../../errors/AppError';
import { createToken, verifyToken } from './auth.utils';
import config from '../../config';

const loginUserFromDB = async (payload: User) => {
  const existUser = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isPasswordMatch = bcrypt.compareSync(
    payload.password,
    existUser.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(401, 'Invalid email or password');
  }

  const jwtPayload = {
    id: existUser.id,
    email: existUser.email,
    role: existUser.role,
    profilePhoto: existUser.profilePhoto,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtSecret as string,
    '365d',
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwtSecret as string,
    '365d',
  );

  return {
    accessToken,
    refreshToken,
    existUser,
  };
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwtSecret as string);

  const { email } = decoded;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(jwtPayload, config.jwtSecret as string, '1h');

  return {
    accessToken,
  };
};


export const AuthServices = {
    loginUserFromDB,
    refreshToken,
}
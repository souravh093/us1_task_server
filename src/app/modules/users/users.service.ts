import { RoleEnum, User } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';
import bcrypt from 'bcryptjs'
const createUserIntoDB = async (payload: User) => {
  const userInfo = {
    ...payload,
    role: RoleEnum.USER,
  };

  if(userInfo.password) {
    userInfo.password = await bcrypt.hash(userInfo.password, 10);
  }

  const result = await prisma.user.create({
    data: userInfo,
  });

  return result;
};

const getUserByEmailFromDB = async (email: string) => {
  const result = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
  });

  return result;
};

const getUsersFromDB = async (query: Record<string, any>) => {
  const userQuery = buildPrismaQuery({
    searchFields: ['name', 'email'],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    page: query.page,
    limit: query.limit,
  });

  const totalUsers = await prisma.user.count({
    where: userQuery.where,
  });

  const totalPages = Math.ceil(totalUsers / userQuery.take);

  const result = await prisma.user.findMany({
    ...userQuery,
  });

  return {
    meta: {
      total: totalUsers,
      limit: userQuery.take,
      page: totalPages,
    },
    result,
  };
};

const updateUserIntoDB = async (id: string, payload: User) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteUserFromDB = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const UserService = {
  createUserIntoDB,
  getUserByEmailFromDB,
  getUsersFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};

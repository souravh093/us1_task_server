import { Session } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createSessionIntoDB = async (payload: Session) => {
  const isUserAlreadyBooked = await prisma.session.findFirst({
    where: {
      skillId: payload.skillId,
      requestorId: payload.requestorId,
    },
  });

    if (isUserAlreadyBooked) {
        throw new Error('User already booked this session');
    }

  const result = await prisma.session.create({
    data: payload,
  });

  return result;
};

const getSessionsFromDB = async (query: Record<string, any>) => {
  const sessionQuery = buildPrismaQuery({
    searchFields: ['skillId', 'requestorId'],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    page: query.page,
    limit: query.limit,
  });

  const totalSessions = await prisma.session.count({
    where: sessionQuery.where,
  });

  const totalPages = Math.ceil(totalSessions / sessionQuery.take);

  const result = await prisma.session.findMany({
    ...sessionQuery,
    include: {
      availability: true,
      skill: true,
      requestor: true,
    },
  });

  return {
    meta: {
      total: totalSessions,
      limit: sessionQuery.take,
      page: totalPages,
    },
    result,
  };
};

const getSessionByIdFromDB = async (id: string) => {
  const result = await prisma.session.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      availability: true,
      skill: true,
      requestor: true,
    },
  });

  return result;
};

const updateSessionIntoDB = async (id: string, payload: Session) => {
  await prisma.session.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.session.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteSessionFromDB = async (id: string) => {
  await prisma.session.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.session.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SessionServices = {
  createSessionIntoDB,
  getSessionsFromDB,
  getSessionByIdFromDB,
  updateSessionIntoDB,
  deleteSessionFromDB,
};

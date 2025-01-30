import { Skill } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createSkillsIntoDB = async (payload: any) => {
  const result = await prisma.skill.create({
    data: {
      ...payload,
      availability: {
        create: payload.availability,
      },
    },
  });

  return result;
};

const getSkillsFromDB = async (query: Record<string, any>) => {

  const skillQuery = buildPrismaQuery({
    searchFields: ['name'],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    page: query.page,
    limit: query.limit,
  });

  const totalSkills = await prisma.skill.count({
    where: skillQuery.where,
  });



  const totalPages = Math.ceil(totalSkills / skillQuery.take);

  const result = await prisma.skill.findMany({
    ...skillQuery,
    include: {
      user: true,
      availability: true,
    },
  });

  return {
    meta: {
      total: totalSkills,
      limit: skillQuery.take,
      page: totalPages,
    },
    result,
  };
};

const getSkillByIdFromDB = async (id: string) => {
  const result = await prisma.skill.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: true,
      availability: true,
    },
  });

  return result;
};

const updateSkillIntoDB = async (id: string, payload: Skill) => {
  await prisma.skill.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.skill.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteSkillFromDB = async (id: string) => {
  await prisma.skill.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.skill.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SkillServices = {
  createSkillsIntoDB,
  getSkillsFromDB,
  getSkillByIdFromDB,
  updateSkillIntoDB,
  deleteSkillFromDB,
};

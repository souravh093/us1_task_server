import { Review } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createReviewIntoDB = async (payload: Review) => {
  const isReviewExist = await prisma.review.findFirst({
    where: {
      sessionId: payload.sessionId,
      reviewerId: payload.reviewerId,
    },
  });

  if (isReviewExist) {
    throw new Error('You have already reviewed this session');
  }

  const result = await prisma.review.create({
    data: payload,
  });

  return result;
};

const getReviewsFromDB = async (query: Record<string, any>) => {
  const reviewQuery = buildPrismaQuery({
    searchFields: ['comment'],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    page: query.page,
    limit: query.limit,
  });

  const totalReviews = await prisma.review.count({
    where: reviewQuery.where,
  });

  const totalPage = Math.ceil(totalReviews / query.limit);

  const result = await prisma.review.findMany({
    ...reviewQuery,
    include: {
      reviewer: true,
      session: {
        include: {
          skill: {
            include: {
              user: true,
              availability: true,
            },
          },
        },
      },
    },
  });

  return {
    meta: {
      total: totalReviews,
      limit: reviewQuery.take,
      page: totalPage,
    },
    result,
  };
};

export const ReviewServices = {
  createReviewIntoDB,
  getReviewsFromDB,
};

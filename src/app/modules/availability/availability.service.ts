import { Availability } from '@prisma/client';
import prisma from '../../../db/db.config';

const createAvailability = async (payload: Availability) => {
  const result = await prisma.availability.create({
    data: payload,
  });

  return result;
};

const deleteAvailabilityFromDB = async (id: string) => {
  await prisma.availability.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.availability.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AvailabilityService = {
  createAvailability,
  deleteAvailabilityFromDB,
};

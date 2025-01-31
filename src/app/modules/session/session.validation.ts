import { z } from 'zod';

const createSessionValidationSchema = z.object({
  body: z.object({
    skillId: z.string({ required_error: 'Skill ID is required' }),
    requestorId: z.string({ required_error: 'Requestor ID is required' }),
    status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED'], {
      required_error: 'Status is required',
    }),
    availabilityId: z.string({ required_error: 'Availability ID is required' }),
  }),
});

const updateSessionValidationSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED'], {
      required_error: 'Status is required',
    }).optional(),
    meetingLink: z.string().optional(),
  }),
});

export const SessionValidations = {
  createSessionValidationSchema,
  updateSessionValidationSchema,
};

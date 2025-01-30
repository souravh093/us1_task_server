import { z } from 'zod';

const createAvailabilityValidationSchema = z.object({
  body: z.object({
    skillId: z.string({ required_error: 'Skill ID is required' }),
    dayOfWeek: z.enum(
      [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ],
      { required_error: 'Day of week is required' },
    ),
    startTime: z.string({ required_error: 'Start time is required' }),
    endTime: z.string({ required_error: 'End time is required' }),
  }),
});

const updateAvailabilityValidationSchema = z.object({
  body: z.object({
    skillId: z.string().optional(),
    dayOfWeek: z
      .enum([
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ])
      .optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const AvailabilityValidations = {
  createAvailabilityValidationSchema,
  updateAvailabilityValidationSchema,
};

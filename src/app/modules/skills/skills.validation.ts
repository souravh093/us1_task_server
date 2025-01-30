import { z } from 'zod';

const createSkillValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Skills name is required' }),
    description: z.string({ required_error: 'Skills description is required' }),
    category: z.enum(
      [
        'PROGRAMMING',
        'DESIGN',
        'MARKETING',
        'BUSINESS',
        'MUSIC',
        'PHOTOGRAPHY',
        'VIDEOGRAPHY',
        'WRITING',
        'COOKING',
        'LANGUAGE',
        'FITNESS',
        'OTHER',
      ],
      { required_error: 'Skills category is required' },
    ),
    image: z
      .string({ required_error: 'Skills image is required' })
      .url({ message: 'Invalid URL' }),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
      required_error: 'Skills level is required',
    }),
    userId: z.string({ required_error: 'User ID is required' }),
  }),
});

const updateSkillValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z
      .enum([
        'PROGRAMMING',
        'DESIGN',
        'MARKETING',
        'BUSINESS',
        'MUSIC',
        'PHOTOGRAPHY',
        'VIDEOGRAPHY',
        'WRITING',
        'COOKING',
        'LANGUAGE',
        'FITNESS',
        'OTHER',
      ])
      .optional(),
    image: z.string().url().optional(),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  }),
});

export const SkillValidations = {
  createSkillValidationSchema,
  updateSkillValidationSchema,
};

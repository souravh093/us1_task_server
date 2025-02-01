import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    sessionId: z.string({ required_error: 'Session ID is required' }),
    rating: z.number({ required_error: 'Rating is required' }),
    comment: z.string({ required_error: 'Comment is required' }),
    reviewerId: z.string({ required_error: 'Reviewer ID is required' }),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
};

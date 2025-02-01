"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidations = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        sessionId: zod_1.z.string({ required_error: 'Session ID is required' }),
        rating: zod_1.z.number({ required_error: 'Rating is required' }),
        comment: zod_1.z.string({ required_error: 'Comment is required' }),
        reviewerId: zod_1.z.string({ required_error: 'Reviewer ID is required' }),
    }),
});
exports.ReviewValidations = {
    createReviewValidationSchema,
};

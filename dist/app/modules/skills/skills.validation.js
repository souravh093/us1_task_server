"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillValidations = void 0;
const zod_1 = require("zod");
const createSkillValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Skills name is required' }),
        description: zod_1.z.string({ required_error: 'Skills description is required' }),
        category: zod_1.z.enum([
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
        ], { required_error: 'Skills category is required' }),
        image: zod_1.z
            .string({ required_error: 'Skills image is required' })
            .url({ message: 'Invalid URL' }),
        level: zod_1.z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
            required_error: 'Skills level is required',
        }),
        userId: zod_1.z.string({ required_error: 'User ID is required' }),
        availability: zod_1.z.array(zod_1.z.object({
            dayOfWeek: zod_1.z.enum([
                'SUNDAY',
                'MONDAY',
                'TUESDAY',
                'WEDNESDAY',
                'THURSDAY',
                'FRIDAY',
                'SATURDAY',
            ], { required_error: 'Day of week is required' }),
            status: zod_1.z.enum(['AVAILABLE', 'UNAVAILABLE'], { required_error: 'Status is required' }).default('AVAILABLE'),
            startTime: zod_1.z.string({ required_error: 'Start time is required' }),
            endTime: zod_1.z.string({ required_error: 'End time is required' }),
        })).optional(),
    }),
});
const updateSkillValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        category: zod_1.z
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
        image: zod_1.z.string().url().optional(),
        level: zod_1.z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
    }),
});
exports.SkillValidations = {
    createSkillValidationSchema,
    updateSkillValidationSchema,
};

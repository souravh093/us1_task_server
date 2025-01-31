"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityValidations = void 0;
const zod_1 = require("zod");
const createAvailabilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        skillId: zod_1.z.string({ required_error: 'Skill ID is required' }),
        dayOfWeek: zod_1.z.enum([
            'SUNDAY',
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
        ], { required_error: 'Day of week is required' }),
        startTime: zod_1.z.string({ required_error: 'Start time is required' }),
        endTime: zod_1.z.string({ required_error: 'End time is required' }),
    }),
});
const updateAvailabilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        skillId: zod_1.z.string().optional(),
        dayOfWeek: zod_1.z
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
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
    }),
});
exports.AvailabilityValidations = {
    createAvailabilityValidationSchema,
    updateAvailabilityValidationSchema,
};

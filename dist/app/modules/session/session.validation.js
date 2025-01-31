"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionValidations = void 0;
const zod_1 = require("zod");
const createSessionValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        skillId: zod_1.z.string({ required_error: 'Skill ID is required' }),
        requestorId: zod_1.z.string({ required_error: 'Requestor ID is required' }),
        status: zod_1.z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED'], {
            required_error: 'Status is required',
        }),
        availabilityId: zod_1.z.string({ required_error: 'Availability ID is required' }),
    }),
});
const updateSessionValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED'], {
            required_error: 'Status is required',
        }).optional(),
        meetingLink: zod_1.z.string().optional(),
    }),
});
exports.SessionValidations = {
    createSessionValidationSchema,
    updateSessionValidationSchema,
};

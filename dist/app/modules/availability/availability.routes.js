"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const availability_validation_1 = require("./availability.validation");
const availability_controller_1 = require("./availability.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.RoleEnum.USER), (0, validationRequest_1.default)(availability_validation_1.AvailabilityValidations.createAvailabilityValidationSchema), availability_controller_1.AvailabilityController.createAvailability);
router.delete('/:id', (0, auth_1.default)(client_1.RoleEnum.USER), availability_controller_1.AvailabilityController.deleteAvailability);
exports.AvailabilityRoutes = router;

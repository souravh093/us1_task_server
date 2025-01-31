"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const session_validation_1 = require("./session.validation");
const session_controller_1 = require("./session.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.RoleEnum.USER), (0, validationRequest_1.default)(session_validation_1.SessionValidations.createSessionValidationSchema), session_controller_1.SessionController.createSession);
router.get('/', 
//   auth(RoleEnum.USER, RoleEnum.ADMIN),
session_controller_1.SessionController.getSessions);
router.get('/:id', (0, auth_1.default)(client_1.RoleEnum.USER, client_1.RoleEnum.ADMIN), session_controller_1.SessionController.getSessionById);
router.put('/:id', (0, auth_1.default)(client_1.RoleEnum.USER), (0, validationRequest_1.default)(session_validation_1.SessionValidations.updateSessionValidationSchema), session_controller_1.SessionController.updateSession);
router.delete('/:id', (0, auth_1.default)(client_1.RoleEnum.USER, client_1.RoleEnum.ADMIN), session_controller_1.SessionController.deleteSession);
exports.SessionRoutes = router;

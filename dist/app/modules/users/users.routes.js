"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const users_validation_1 = require("./users.validation");
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/', (0, validationRequest_1.default)(users_validation_1.UserValidations.createUserValidationSchema), users_controller_1.UserController.createUser);
router.get('/', (0, auth_1.default)(client_1.RoleEnum.ADMIN), users_controller_1.UserController.getUsers);
router.get('/:email', (0, auth_1.default)(client_1.RoleEnum.ADMIN, client_1.RoleEnum.USER), users_controller_1.UserController.getUserByEmail);
router.put('/:id', (0, auth_1.default)(client_1.RoleEnum.ADMIN, client_1.RoleEnum.USER), users_controller_1.UserController.updateUser);
router.delete('/:id', (0, auth_1.default)(client_1.RoleEnum.ADMIN), users_controller_1.UserController.deleteUser);
exports.UserRoutes = router;

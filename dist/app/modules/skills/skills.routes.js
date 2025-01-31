"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const skills_validation_1 = require("./skills.validation");
const skills_controller_1 = require("./skills.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.RoleEnum.USER), (0, validationRequest_1.default)(skills_validation_1.SkillValidations.createSkillValidationSchema), skills_controller_1.SkillController.createSkill);
router.get('/', (0, auth_1.default)(client_1.RoleEnum.USER, client_1.RoleEnum.ADMIN), skills_controller_1.SkillController.getSkills);
router.get('/:id', skills_controller_1.SkillController.getSkillById);
router.put('/:id', (0, auth_1.default)(client_1.RoleEnum.USER), (0, validationRequest_1.default)(skills_validation_1.SkillValidations.updateSkillValidationSchema), skills_controller_1.SkillController.updateSkill);
router.delete('/:id', (0, auth_1.default)(client_1.RoleEnum.USER), skills_controller_1.SkillController.deleteSkill);
exports.SkillRoutes = router;

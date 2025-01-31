"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createSkillsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.skill.create({
        data: Object.assign(Object.assign({}, payload), { availability: {
                create: payload.availability,
            } }),
    });
    return result;
});
const getSkillsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const skillQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['name'],
        searchTerm: query.searchTerm,
        filter: query.filter && JSON.parse(query.filter),
        orderBy: query.orderBy && JSON.parse(query.orderBy),
        page: query.page,
        limit: query.limit,
    });
    const totalSkills = yield db_config_1.default.skill.count({
        where: skillQuery.where,
    });
    const totalPages = Math.ceil(totalSkills / skillQuery.take);
    const result = yield db_config_1.default.skill.findMany(Object.assign(Object.assign({}, skillQuery), { include: {
            user: true,
            availability: true,
            session: true,
        } }));
    return {
        meta: {
            total: totalSkills,
            limit: skillQuery.take,
            page: totalPages,
        },
        result,
    };
});
const getSkillByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.skill.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            user: true,
            availability: true,
        },
    });
    return result;
});
const updateSkillIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.skill.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.skill.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteSkillFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.skill.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.skill.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.SkillServices = {
    createSkillsIntoDB,
    getSkillsFromDB,
    getSkillByIdFromDB,
    updateSkillIntoDB,
    deleteSkillFromDB,
};

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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = Object.assign(Object.assign({}, payload), { role: client_1.RoleEnum.USER });
    if (userInfo.password) {
        userInfo.password = yield bcryptjs_1.default.hash(userInfo.password, 10);
    }
    const result = yield db_config_1.default.user.create({
        data: userInfo,
    });
    return result;
});
const getUserByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.user.findFirstOrThrow({
        where: {
            email,
        },
    });
    return result;
});
const getUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['name', 'email'],
        searchTerm: query.searchTerm,
        filter: query.filter && JSON.parse(query.filter),
        orderBy: query.orderBy && JSON.parse(query.orderBy),
        page: query.page,
        limit: query.limit,
    });
    const totalUsers = yield db_config_1.default.user.count({
        where: userQuery.where,
    });
    const totalPages = Math.ceil(totalUsers / userQuery.take);
    const result = yield db_config_1.default.user.findMany(Object.assign({}, userQuery));
    return {
        meta: {
            total: totalUsers,
            limit: userQuery.take,
            page: totalPages,
        },
        result,
    };
});
const updateUserIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.UserService = {
    createUserIntoDB,
    getUserByEmailFromDB,
    getUsersFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
};

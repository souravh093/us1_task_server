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
exports.SessionServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createSessionIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAlreadyBooked = yield db_config_1.default.session.findFirst({
        where: {
            skillId: payload.skillId,
            requestorId: payload.requestorId,
        },
    });
    if (isUserAlreadyBooked) {
        throw new Error('User already booked this session');
    }
    const result = yield db_config_1.default.session.create({
        data: payload,
    });
    return result;
});
const getSessionsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['skillId', 'requestorId'],
        searchTerm: query.searchTerm,
        filter: query.filter && JSON.parse(query.filter),
        orderBy: query.orderBy && JSON.parse(query.orderBy),
        page: query.page,
        limit: query.limit,
    });
    const totalSessions = yield db_config_1.default.session.count({
        where: sessionQuery.where,
    });
    const totalPages = Math.ceil(totalSessions / sessionQuery.take);
    const result = yield db_config_1.default.session.findMany(Object.assign(Object.assign({}, sessionQuery), { include: {
            availability: true,
            skill: {
                include: {
                    user: true,
                }
            },
            requestor: true,
        } }));
    return {
        meta: {
            total: totalSessions,
            limit: sessionQuery.take,
            page: totalPages,
        },
        result,
    };
});
const getSessionByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.session.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            availability: true,
            skill: true,
            requestor: true,
        },
    });
    return result;
});
const updateSessionIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload', payload);
    yield db_config_1.default.session.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.session.update({
        where: {
            id,
        },
        data: payload,
    });
    console.log('result', result);
    return result;
});
const deleteSessionFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.session.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.session.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.SessionServices = {
    createSessionIntoDB,
    getSessionsFromDB,
    getSessionByIdFromDB,
    updateSessionIntoDB,
    deleteSessionFromDB,
};

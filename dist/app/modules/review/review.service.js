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
exports.ReviewServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createReviewIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isReviewExist = yield db_config_1.default.review.findFirst({
        where: {
            sessionId: payload.sessionId,
            reviewerId: payload.reviewerId,
        },
    });
    if (isReviewExist) {
        throw new Error('You have already reviewed this session');
    }
    const result = yield db_config_1.default.review.create({
        data: payload,
    });
    return result;
});
const getReviewsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['comment'],
        searchTerm: query.searchTerm,
        filter: query.filter && JSON.parse(query.filter),
        orderBy: query.orderBy && JSON.parse(query.orderBy),
        page: query.page,
        limit: query.limit,
    });
    const totalReviews = yield db_config_1.default.review.count({
        where: reviewQuery.where,
    });
    const totalPage = Math.ceil(totalReviews / query.limit);
    const result = yield db_config_1.default.review.findMany(Object.assign(Object.assign({}, reviewQuery), { include: {
            reviewer: true,
            session: {
                include: {
                    skill: {
                        include: {
                            user: true,
                            availability: true,
                        },
                    },
                },
            },
        } }));
    return {
        meta: {
            total: totalReviews,
            limit: reviewQuery.take,
            page: totalPage,
        },
        result,
    };
});
exports.ReviewServices = {
    createReviewIntoDB,
    getReviewsFromDB,
};

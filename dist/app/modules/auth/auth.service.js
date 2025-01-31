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
exports.AuthServices = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const loginUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield db_config_1.default.user.findFirstOrThrow({
        where: {
            email: payload.email,
        },
    });
    const isPasswordMatch = bcryptjs_1.default.compareSync(payload.password, existUser.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(401, 'Invalid email or password');
    }
    const jwtPayload = {
        id: existUser.id,
        email: existUser.email,
        role: existUser.role,
        profilePhoto: existUser.profilePhoto,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtSecret, '365d');
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtSecret, '365d');
    return {
        accessToken,
        refreshToken,
        existUser,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwtSecret);
    const { email } = decoded;
    const user = yield db_config_1.default.user.findUniqueOrThrow({
        where: {
            email,
        },
    });
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtSecret, '1h');
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUserFromDB,
    refreshToken,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        meta: data.meta,
        data: data.data,
    };
    if (data.token) {
        responseData.token = {
            accessToken: data.token.accessToken,
            refreshToken: data.token.refreshToken,
        };
    }
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;

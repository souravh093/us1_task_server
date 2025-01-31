"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundRoute = (req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Route not found',
    });
};
exports.default = notFoundRoute;

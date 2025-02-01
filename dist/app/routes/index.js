"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = require("../modules/users/users.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const skills_routes_1 = require("../modules/skills/skills.routes");
const availability_routes_1 = require("../modules/availability/availability.routes");
const session_routes_1 = require("../modules/session/session.routes");
const review_routes_1 = require("../modules/review/review.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: users_routes_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/skills',
        route: skills_routes_1.SkillRoutes,
    },
    {
        path: '/availability',
        route: availability_routes_1.AvailabilityRoutes,
    },
    {
        path: '/sessions',
        route: session_routes_1.SessionRoutes,
    },
    {
        path: '/reviews',
        route: review_routes_1.ReviewRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

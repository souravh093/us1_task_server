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
exports.sendEmailToAdmin = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (link, email) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'souravofficial.web@gmail.com',
            pass: 'nvkk qpux gzte nmjp',
        },
    });
    // send mail
    yield transporter.sendMail({
        from: 'souravofficial.web@gmail.com',
        to: `${email}`,
        subject: 'Reset you password within 1 hour',
        text: 'Click the Link below to reset your password',
        html: link,
    });
});
exports.sendEmail = sendEmail;
const sendEmailToAdmin = (email, name, message) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'souravofficial.web@gmail.com',
            pass: 'nvkk qpux gzte nmjp',
        },
    });
    // send mail
    yield transporter.sendMail({
        from: `${email}`,
        to: 'souravofficial.web@gmail.com',
        subject: `Contact me from my website by ${name}`,
        text: message,
        html: `<p>${message}</p>`,
    });
});
exports.sendEmailToAdmin = sendEmailToAdmin;

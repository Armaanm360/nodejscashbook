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
const constants_1 = require("../miscellaneous/constants");
const config_1 = __importDefault(require("../../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMyEmailOtp_1 = require("./../../templates/sendMyEmailOtp");
class Lib {
    // make hashed password
    static hashPass(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            return yield bcryptjs_1.default.hash(password, salt);
        });
    }
    /**
     * verify password
     */
    static compare(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(password, hashedPassword);
        });
    }
    // create token
    static createToken(creds, secret, maxAge) {
        return jsonwebtoken_1.default.sign(creds, secret, { expiresIn: maxAge });
    }
    // verify token
    static verifyToken(token, secret) {
        try {
            return jsonwebtoken_1.default.verify(token, secret);
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    // generate random Number
    static otpGenNumber(length) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        let otp = '';
        for (let i = 0; i < length; i++) {
            const randomNumber = Math.floor(Math.random() * 10);
            otp += numbers[randomNumber];
        }
        return otp;
    }
    // generate random Number and alphabet
    static otpGenNumberAndAlphabet(length) {
        let otp = '';
        for (let i = 0; i < length; i++) {
            const randomNumber = Math.floor(Math.random() * constants_1.allStrings.length);
            otp += constants_1.allStrings[randomNumber];
        }
        return otp;
    }
    // send email by nodemailer
    static customSendMail(email, subject, body, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        user: config_1.default.EMAIL_SEND_EMAIL_ID,
                        pass: config_1.default.EMAIL_SEND_PASSWORD,
                    },
                });
                const info = yield transporter.sendMail({
                    from: config_1.default.EMAIL_SEND_EMAIL_ID,
                    to: email,
                    subject: subject,
                    html: (0, sendMyEmailOtp_1.sendMyEmailOtp)(otp),
                });
                // console.log('message sent to' + '-' + info.to);
                return true;
            }
            catch (err) {
                console.log({ err });
                return false;
            }
        });
    }
    // public static async customSendMail(
    //   email: string,
    //   subject: string,
    //   body: string,
    //   otp: string
    // ) {
    //   try {
    //     const transporter = nodemailer.createTransport({
    //       service: 'gmail',
    //       auth: {
    //         user: config.EMAIL_SEND_EMAIL_ID,
    //         pass: config.EMAIL_SEND_PASSWORD,
    //       },
    //     });
    //     const info = await transporter.sendMail({
    //       from: config.EMAIL_SEND_EMAIL_ID,
    //       to: email,
    //       subject: subject,
    //       html: sendMyEmailOtp(otp),
    //     });
    //     console.log('message sent to' + '-' + info.to);
    //     return true;
    //   } catch (err: any) {
    //     console.log({ err });
    //     return false;
    //   }
    // }
    static getAnyMonthFirstDate(month) {
        function monthsGetDays(month) {
            switch (month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return 31;
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                    break;
                case 2:
                    return 28;
                default:
                    return 0;
                    break;
            }
        }
        const year = new Date().getUTCFullYear();
        const amonth = 0 + month;
        const firstday = '01';
        const lastday = monthsGetDays(month);
        const firsdayString = `${String(year)}-${String(amonth).padStart(2, '0')}-${String(firstday).padStart(2, '0')}`;
        const lastDayString = `${String(year)}-${String(amonth).padStart(2, '0')}-${String(lastday).padStart(2, '0')}`;
        return { firsdayString, lastDayString };
    }
}
exports.default = Lib;

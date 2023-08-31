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
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
const lib_1 = __importDefault(require("../../utils/lib/lib"));
class Otpservice extends abstract_service_1.default {
    constructor() {
        super();
    }
    //send otp service
    otpServiceMethod(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = lib_1.default.otpGenNumber(6);
            const ifres = yield this.db('email_verification_table')
                .where('email', email)
                .first()
                .count();
            const findRow = ifres['count(*)'];
            if (Number(findRow) > 0) {
                return {
                    success: false,
                    code: 401,
                    message: 'User Already Ase',
                };
            }
            else {
                const res = yield this.db('email_verification_table').insert({
                    email,
                    otp,
                });
                lib_1.default.customSendMail(email, 'One Time Password (Otp)', 'this is otp', otp);
                if (res.length) {
                    return {
                        success: true,
                        code: 201,
                        message: 'Otp Sent Successfully',
                        data: {
                            email,
                            otp,
                        },
                    };
                }
                else {
                    return {
                        success: false,
                        code: 401,
                        message: 'data not found',
                    };
                }
            }
        });
    }
    //check otp service
    otpCheckServiceMethod(otp_email, otp_chek) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifres = yield this.db('email_verification_table')
                .where('email', otp_email)
                .andWhere('status', 'sendotp')
                .andWhere('otp', otp_chek)
                .first()
                .count();
            const getId = yield this.db('email_verification_table')
                .where('email', otp_email)
                .andWhere('status', 'sendotp')
                .andWhere('otp', otp_chek)
                .first();
            const findRow = ifres['count(*)'];
            if (Number(findRow) > 0) {
                const res = yield this.db('email_verification_table')
                    .where('email_verify_id', getId['email_verify_id'])
                    .update({ status: 'checked' });
                // Lib.customSendMail(email, 'One Time Password (Otp)', 'this is otp', otp);
                if (res) {
                    return {
                        success: true,
                        code: 201,
                        message: 'Otp Check Successfully',
                    };
                }
                else {
                    return {
                        success: false,
                        code: 401,
                        message: 'data not found',
                    };
                }
            }
            else {
                return {
                    success: false,
                    code: 401,
                    message: 'Otp Not Matched',
                };
            }
        });
    }
}
exports.default = Otpservice;

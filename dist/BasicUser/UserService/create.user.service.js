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
const common_service_1 = __importDefault(require("../../common/commonService/common.service"));
const lib_1 = __importDefault(require("../../utils/lib/lib"));
class CreateUserService extends abstract_service_1.default {
    constructor() {
        super();
        this.commonService = new common_service_1.default();
    }
    createService({ name, email, username, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPas = yield lib_1.default.hashPass(password);
            // console.log(password);
            const dbtab = 'users';
            const checkforeamil = yield this.commonService.checkUserByUniqueKey({
                table: dbtab,
                field: 'email',
                value: email,
            });
            if (!checkforeamil) {
                const res = yield this.db('users').insert({
                    name,
                    email,
                    username,
                    password: hashPas,
                });
                if (res.length) {
                    return {
                        success: true,
                        code: 201,
                        message: 'User added successfully',
                        data: { name, email, username, password: hashPas },
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
                    success: true,
                    code: 401,
                    message: 'Email Already Exsists',
                };
            }
        });
    }
}
exports.default = CreateUserService;

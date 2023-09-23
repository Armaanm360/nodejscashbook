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
class TransService extends abstract_service_1.default {
    createServiceTrans(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = payload[0].user_id;
            const dbdata = yield this.db('transactions').where('user_id', userid);
            const datacount = dbdata.length;
            const dbuserid = dbdata[0].user_id;
            const dbpackage = yield this.db('users').where('id', dbuserid).join('packages', 'packages.package_id', '=', 'users.package_activated');
            const activatedpackage = dbpackage[0].package_name;
            if (datacount === 10 && activatedpackage === 'FREE') {
                return {
                    success: false,
                    code: 401,
                    message: 'You Are Running FREE version,For More Entry,please check our packages'
                };
            }
            else if (datacount === 20 && activatedpackage === 'STANDARD') {
                return {
                    success: false,
                    code: 401,
                    message: 'You Are Running STANDARD version,For More Entry,please check our packages'
                };
            }
            else if (datacount === 30 && activatedpackage === 'PLUS') {
                return {
                    success: false,
                    code: 401,
                    message: 'You Are Running PLUS version,For More Entry,please check our packages'
                };
            }
            else if (datacount === 40 && activatedpackage === 'PREMIUM') {
                return {
                    success: false,
                    code: 401,
                    message: 'You Are Running PREMIUM version,For More Entry,please check our packages'
                };
            }
            else {
                const requestdata = payload;
                //  return {
                //   success: true,
                //   code: 201,
                //   message: 'Data Fetched Successfully',
                //   data: dbdata,
                // };
                const objA = dbdata;
                const objB = requestdata;
                const difference = [];
                for (const itemB of objB) {
                    const itemA = objA.find((item) => item.from_app_id === itemB.from_app_id);
                    if (!itemA) {
                        difference.push(itemB);
                    }
                }
                const objectC = {
                    difference
                };
                if (difference.length === 0) {
                    return {
                        success: true,
                        code: 201,
                        message: 'Data Already Exported'
                        // data: requestdata,
                    };
                }
                else {
                    const newinserted = yield this.db('transactions').insert(difference);
                    return {
                        success: true,
                        code: 201,
                        message: 'Data Exported Successfully',
                        data: difference,
                    };
                }
            }
        });
    }
    //create payment 
    createPayment(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = payload.user_id;
            const current_package = payload.current_package;
            const requested_package = payload.request_package;
            const given_amount = parseFloat(payload.amount);
            const requested_package_price = yield this.db('packages').select('package_price').where('package_id', requested_package).first();
            const request_package_name = requested_package_price.package_name;
            const final_price = parseFloat(requested_package_price.package_price);
            if (current_package > requested_package) {
                return {
                    success: true,
                    code: 401,
                    message: 'The Package You Are Looking For Is Not Available',
                };
                // console.log('The Package You Are Looking For Is Not Available');
            }
            else if (given_amount < final_price) {
                return {
                    success: true,
                    code: 401,
                    message: 'Invalid Amount',
                };
                // console.log('Invalid Amount');
            }
            else {
                const confirm_payment = yield this.db('payments').insert({ amount: given_amount, requested_package: requested_package, user_id: user_id });
                const update_user_package = yield this.db('users').where({ id: user_id }).update({ package_activated: requested_package });
                const info = yield this.db('users').where({ 'id': user_id }).join('packages', 'packages.package_id', '=', 'users.package_activated').first();
                let getUserId = info.username;
                let email = info.username;
                let getUserPackage = info.package_name;
                let getUserPackageId = info.package_id;
                console.log('Payment Successful');
                return {
                    success: true,
                    code: 201,
                    message: 'Payment Successful',
                    data: { email, getUserPackage, getUserPackageId },
                };
            }
        });
    }
    listServiceTrans(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('transactions').where('user_id', userid);
            return {
                success: true,
                code: 201,
                message: 'Data Fetched Successfully',
                // data: {data},
            };
        });
    }
    listPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('packages');
            return {
                success: true,
                code: 201,
                message: 'Data Fetched Successfully',
                data: { data },
            };
        });
    }
}
exports.default = TransService;

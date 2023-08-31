"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const otp_controller_1 = __importDefault(require("../UserController/otp.controller"));
class SendOtp extends abstract_router_1.default {
    constructor() {
        super();
        this.otpController = new otp_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router.route('/otp-get').get(this.otpController.getOtp);
        this.router.route('/otp-check').get(this.otpController.otpCheck);
    }
}
exports.default = SendOtp;
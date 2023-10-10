"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const user_validator_1 = __importDefault(require("../validator/user.validator"));
const login_user_controller_1 = __importDefault(require("../UserController/login.user.controller"));
class LoginRoute extends abstract_router_1.default {
    constructor() {
        super();
        this.loginUserValidator = new user_validator_1.default();
        this.loginController = new login_user_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route('/login')
            .post(this.loginUserValidator.loginUserValidator(), this.loginController.loginControllerMethod);
    }
}
exports.default = LoginRoute;

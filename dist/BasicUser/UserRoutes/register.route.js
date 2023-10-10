"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const create_user_controller_1 = __importDefault(require("../UserController/create.user.controller"));
const user_validator_1 = __importDefault(require("./../validator/user.validator"));
class RegisterRoutes extends abstract_router_1.default {
    constructor() {
        super();
        this.createUserController = new create_user_controller_1.default();
        this.userValidator = new user_validator_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route('/register')
            .post(this.userValidator.createUserValidator(), this.createUserController.createUserMeth);
    }
}
exports.default = RegisterRoutes;

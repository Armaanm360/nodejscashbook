"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
class LoginRoute extends abstract_router_1.default {
    constructor() {
        super();
        this.callRouter();
    }
    callRouter() {
        this.router.route('/login').get((req, res) => {
            res.send('This is Login Router');
        });
    }
}
exports.default = LoginRoute;

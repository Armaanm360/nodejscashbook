"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const responseMessage_1 = __importDefault(require("../../utils/miscellaneous/responseMessage"));
class UserValidator {
    createUserValidator() {
        return [
            (0, express_validator_1.body)('username', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .isLength({ min: 3, max: 11 }),
            (0, express_validator_1.body)('name', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isString()
                .isLength({ max: 55 }),
            (0, express_validator_1.body)('email', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY)
                .isEmail()
                .withMessage('Please Provide Email')
                .isLength({ max: 100 }),
        ];
    }
    loginUserValidator() {
        return [(0, express_validator_1.body)('email', responseMessage_1.default.HTTP_UNPROCESSABLE_ENTITY).isEmail()];
    }
}
exports.default = UserValidator;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const basic_router_1 = __importDefault(require("../BasicModule/basic.router"));
class RootRouter {
    //learn about constructor
    //where we define - we make that from scratch
    constructor() {
        //this should be public
        this.v1Router = (0, express_1.Router)();
        this.basicRouter = new basic_router_1.default();
        this.callV1Router();
    }
    //now call callV1Router
    //which has to be private
    callV1Router() {
        //define the first basic route
        this.v1Router.use("/simple", this.basicRouter.BasicRouter);
    }
}
exports.default = RootRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    // private origin: string[] = origin
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        //rest
    }
    //start server
    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Cashbook Server is on the Fire:${this.port}🚀`);
        });
    }
}
exports.default = App;

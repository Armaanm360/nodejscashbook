"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const customEror_1 = __importDefault(require("../utils/lib/customEror"));
const errorHandler_1 = __importDefault(require("../common/middlewares/errorHandler/errorHandler"));
class App {
    // private origin: string[] = origin
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initMiddlewares();
        this.initRouters();
        this.notFoundRouter();
        this.errorHandle();
    }
    // init middlewares
    initMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // this.app.use(morgan('dev'));
        this.app.use((0, cors_1.default)({ origin: ['localhost:3000'], credentials: true }));
    }
    //start server
    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Cashbook Server is on the Fire:${this.port}🚀`);
        });
    }
    //init server routes
    initRouters() {
        this.app.get('/', (_req, res) => {
            res.send(`ক্যাশবুক সার্ভার চলতেসে`);
        });
        this.app.use('/api/v1', new router_1.default().v1Router);
    }
    // not found router
    notFoundRouter() {
        this.app.use('*', (_req, _res, next) => {
            next(new customEror_1.default('Cannot found the route', 404, 'Invalid route'));
        });
    }
    // error handler
    errorHandle() {
        this.app.use(new errorHandler_1.default().handleErrors);
    }
}
exports.default = App;

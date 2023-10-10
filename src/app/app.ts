import express, { Application, NextFunction, Request, Response } from 'express';
import RootRouter from './router';
import cors from 'cors';
import CustomError from '../utils/lib/customEror';
import ErrorHandler from '../common/middlewares/errorHandler/errorHandler';

class App {
  public app: Application;
  private port: number;
  // private origin: string[] = origin

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initMiddlewares();
    this.initRouters();
    this.notFoundRouter();
    this.errorHandle();
  }

  // init middlewares
  private initMiddlewares() {
    // this.app.use(express.json());
    this.app.use(express.json({ strict: false }))
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(morgan('dev'));
    this.app.use(cors({ origin: ['localhost:3000'], credentials: true }));
  }

  //start server

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`Cashbook Server is on the Fire:${this.port}🚀`);
    });
  }

  //init server routes

  private initRouters() {
    this.app.get('/', (_req: Request, res: Response) => {
      res.send(`ক্যাশবুক সার্ভার চলতেসে`);
    });
    this.app.use('/api/v1', new RootRouter().v1Router);
  }

  // not found router
  private notFoundRouter() {
    this.app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
      next(new CustomError('Cannot found the route', 404, 'Invalid route'));
    });
  }

  // error handler
  private errorHandle() {
    this.app.use(new ErrorHandler().handleErrors);
  }
}

export default App;

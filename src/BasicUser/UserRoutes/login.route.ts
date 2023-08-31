import { Request, Response } from "express";
import AbstractRouter from "../../abstract/abstract.router";

class LoginRoute extends AbstractRouter {

  constructor() {
    super();
    this.callRouter();
  }


  public callRouter() {

    this.router.route('/login').get((req: Request, res: Response) => {
      res.send('This is Login Router');
    });

  }



}

export default LoginRoute;
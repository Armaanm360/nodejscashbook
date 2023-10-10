import { Request, Response } from 'express';
import AbstractRouter from '../../abstract/abstract.router';
import UserValidator from '../validator/user.validator';
import LoginUserController from '../UserController/login.user.controller';

class LoginRoute extends AbstractRouter {
  private loginUserValidator = new UserValidator();
  private loginController = new LoginUserController();
  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router
      .route('/login')
      .post(
        this.loginUserValidator.loginUserValidator(),
        this.loginController.loginControllerMethod
      );
  }
}

export default LoginRoute;

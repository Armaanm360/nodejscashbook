import AbstractRouter from '../../abstract/abstract.router';
import createUserController from '../UserController/create.user.controller';
import UserValidator from './../validator/user.validator';

class RegisterRoutes extends AbstractRouter {
  private createUserController = new createUserController();
  private userValidator = new UserValidator();
  constructor() {
    super();
    this.callRouter();
  }

  public callRouter() {
    this.router
      .route('/register')
      .post(
        this.userValidator.createUserValidator(),
        this.createUserController.createUserMeth
      );
  }
}

export default RegisterRoutes;

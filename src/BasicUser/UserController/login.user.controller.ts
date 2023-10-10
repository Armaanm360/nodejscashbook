import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import LoginService from '../UserService/login.user.service';
import { ILogin } from '../../common/types/commontypes';

class LoginUserController extends AbstractController {
  private createLoginService = new LoginService();
  constructor() {
    super();
  }
  public loginControllerMethod = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email, password } = req.body as ILogin;
      const { code, ...data } =
        await this.createLoginService.loginServiceMethod({
          email,
          password,
        });

      res.status(code).json(data);
    }
  );
}
export default LoginUserController;

import { Response, Request } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import CreateUserService from './../UserService/create.user.service';

class createUserController extends AbstractController {
  constructor() {
    super();
  }
  private CreateUserService = new CreateUserService();
  public createUserMeth = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { name, email, username, password } = req.body;

      const { code, ...data } = await this.CreateUserService.createService({
        name,
        email,
        username,
        password,
      });

      res.status(code).json(data);
    }
  );
}

export default createUserController;

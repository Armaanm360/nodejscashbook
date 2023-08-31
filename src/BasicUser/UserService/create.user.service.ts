import AbstractService from '../../abstract/abstract.service';
import { CreatingUser } from '../utils/user.types';

class CreateUserService extends AbstractService {
  constructor() {
    super();
  }
  public async createService({
    name,
    email,
    username,
    password,
  }: CreatingUser) {
    const res = await this.db('users').insert({
      name,
      email,
      username,
      password,
    });

    if (res.length) {
      return {
        success: true,
        code: 201,
        message: 'User added successfully',
        data: { name, email, username, password },
      };
    } else {
      return {
        success: false,
        code: 401,
        message: 'data not found',
      };
    }
  }
}

export default CreateUserService;

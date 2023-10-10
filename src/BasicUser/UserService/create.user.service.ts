import AbstractService from '../../abstract/abstract.service';
import CommonService from '../../common/commonService/common.service';
import Lib from '../../utils/lib/lib';
import { CreatingUser } from '../utils/user.types';

class CreateUserService extends AbstractService {
  private commonService = new CommonService();
  constructor() {
    super();
  }
  public async createService({
    name,
    email,
    username,
    password,
  }: CreatingUser) {
    const hashPas = await Lib.hashPass(password);
    // console.log(password);
    const dbtab = 'users';
    const checkforeamil = await this.commonService.checkUserByUniqueKey({
      table: dbtab,
      field: 'email',
      value: email,
    });

    if (!checkforeamil) {
      const res = await this.db('users').insert({
        name,
        email,
        username,
        password: hashPas,
      });

      if (res.length) {
        return {
          success: true,
          code: 201,
          message: 'User added successfully',
          data: { name, email, username, password: hashPas },
        };
      } else {
        return {
          success: false,
          code: 401,
          message: 'data not found',
        };
      }
    } else {
      return {
        success: true,
        code: 401,
        message: 'Email Already Exsists',
      };
    }
  }
}

export default CreateUserService;

import { check } from 'express-validator';
import AbstractService from '../../abstract/abstract.service';
import { ILogin } from '../../common/types/commontypes';
import Lib from '../../utils/lib/lib';
import config from '../../config/config';
// Promise<ILoginRes>;
class LoginService extends AbstractService {
  constructor() {
    super();
  }
  public async loginServiceMethod({ email, password }: ILogin) {
    const checkUser = await this.db('users').select('*').where({ email });

    //checking if user a
    if (!checkUser.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }
    console.log({ checkUser });

    console.log({ password });

    const { password: hashPass, ...rest } = checkUser[0];

    console.log({ hashPass });
    const checkPass = await Lib.compare(password, hashPass);

    console.log({ checkPass });

    if (!checkPass) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    const token = Lib.createToken(
      { ...rest, type: 'member' },
      config.JWT_SECRET,
      '24hr'
    );
    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.LOGIN_SUCCESSFUL,
      data: rest,
      token,
    };
  }
}

export default LoginService;

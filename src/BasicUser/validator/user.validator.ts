import { body } from 'express-validator';
import ResMsg from '../../utils/miscellaneous/responseMessage';

class UserValidator {
  public createUserValidator() {
    return [
      body('username', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .isLength({ min: 3, max: 11 }),
      body('name', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .isLength({ max: 55 }),
      body('email', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isEmail()
        .withMessage('Please Provide Email')
        .isLength({ max: 100 }),
    ];
  }

  public loginUserValidator() {
    return [body('email', ResMsg.HTTP_UNPROCESSABLE_ENTITY).isEmail()];
  }
}

export default UserValidator;

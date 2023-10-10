import AbstractService from '../../abstract/abstract.service';
import Lib from '../../utils/lib/lib';

class Otpservice extends AbstractService {
  constructor() {
    super();
  }

  //send otp service
  public async otpServiceMethod(email: string) {
    const otp = Lib.otpGenNumber(6);
    const ifres = await this.db('email_verification_table')
      .where('email', email)
      .first()
      .count();

    const findRow = ifres['count(*)'];

    if (Number(findRow) > 0) {
      return {
        success: false,
        code: 401,
        message: 'User Already Ase',
      };
    } else {
      const res = await this.db('email_verification_table').insert({
        email,
        otp,
      });

      // Lib.customSendMail(email, 'One Time Password (Otp)', 'this is otp', otp);

      if (res.length) {
        return {
          success: true,
          code: 201,
          message: 'Otp Sent Successfully',
          data: {
            email,
            otp,
          },
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

  //check otp service
  public async otpCheckServiceMethod(otp_email: string, otp_chek: string) {
    const ifres = await this.db('email_verification_table')
      .where('email', otp_email)
      .andWhere('status', 'sendotp')
      .andWhere('otp', otp_chek)
      .first()
      .count();

    const getId = await this.db('email_verification_table')
      .where('email', otp_email)
      .andWhere('status', 'sendotp')
      .andWhere('otp', otp_chek)
      .first();
    const findRow = ifres['count(*)'];
    if (Number(findRow) > 0) {
      const res = await this.db('email_verification_table')
        .where('email_verify_id', getId['email_verify_id'])
        .update({ status: 'checked' });

      // Lib.customSendMail(email, 'One Time Password (Otp)', 'this is otp', otp);

      if (res) {
        return {
          success: true,
          code: 201,
          message: 'Otp Check Successfully',
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
        success: false,
        code: 401,
        message: 'Otp Not Matched',
      };
    }
  }
}

export default Otpservice;

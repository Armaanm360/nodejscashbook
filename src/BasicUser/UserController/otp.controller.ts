import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import Otpservice from '../UserService/otp.service';

class OtpController extends AbstractController {
  constructor() {
    super();
  }

  private createOtpService = new Otpservice();

  public getOtp = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email } = req.query;

      const otp = await this.createOtpService.otpServiceMethod(String(email));

      res.status(201).json(otp);
    }
  );

  public otpCheck = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { otp_email, otp_check } = req.query;

      const check_email_otp = await this.createOtpService.otpCheckServiceMethod(
        String(otp_email),
        String(otp_check)
      );
      res.status(201).json(check_email_otp);
    }
  );
}

export default OtpController;

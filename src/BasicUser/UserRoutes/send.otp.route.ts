import { Request, Response } from 'express';
import AbstractRouter from '../../abstract/abstract.router';
import OtpController from '../UserController/otp.controller';

class SendOtp extends AbstractRouter {
  private otpController = new OtpController();
  constructor() {
    super();
    this.callRouter();
  }
  public callRouter() {
    this.router.route('/otp-get').get(this.otpController.getOtp);
    this.router.route('/otp-check').get(this.otpController.otpCheck);
  }
}

export default SendOtp;

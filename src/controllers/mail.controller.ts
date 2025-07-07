"use strict";

import { Request, Response } from "express";
import SuccessResponse from "~/response/success.response";
import MailService from "~/services/mail.service";

class MailController {
  public static async sendMail(req: Request, res: Response) {
    new SuccessResponse(200, "Send Mail SuccessFully", await MailService.sendMail(req.body)).send(res);
  }
}

export default MailController;

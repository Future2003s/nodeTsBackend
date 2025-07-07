import { Router } from "express";
import MailController from "~/controllers/mail.controller";

const mailRouter = Router();

mailRouter.post("/sendMail", MailController.sendMail);

export default mailRouter;

import nodemailer from "nodemailer";
import { google } from "googleapis";
import { TypeRequestBodyMail } from "~/services/mail.service";
import { confirmOrderCustomer, templateAlertOrderNow, templateThankYou } from "./templateMail.html";

export async function sendMail(data: TypeRequestBodyMail) {
  const REFRESH_TOKEN: string = String(process.env.REFRESH_TOKEN);
  const REDIRECT_URI: string = String(process.env.REDIRECT_URI);
  const CLIENT_SECRET: string = String(process.env.CLIENT_SECRET);
  const CLIENT_ID: string = String(process.env.CLIENT_ID);

  const oAuth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  oAuth2.setCredentials({
    refresh_token: REFRESH_TOKEN
  });

  const access_token = await oAuth2.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      type: "oauth2",
      user: "lalalycheee1@gmail.com",
      clientId: CLIENT_ID,
      refreshToken: REFRESH_TOKEN,
      accessToken: access_token.token as string
    }
  });

  //   let typeEmail: (args: TypeRequestBodyMail) => string;

  //   console.log("data.emailType", data.emailType);
  //   switch (data.emailType) {
  //     case "thankyou":
  //       typeEmail = templateThankYou;
  //       break;
  //     case "authenticated":
  //       typeEmail = confirmOrderCustomer;
  //       break;
  //     default:
  //       typeEmail = templateAlertOrderNow;
  //       break;
  //   }

  //   console.log("typeEmail", typeEmail);

  let contentSubject: string = "";

  switch (data.emailType) {
    case "authenticated":
      contentSubject = "CONFIRMED ORDER";
      break;
    case "delivering":
      contentSubject = "DELIVERING";
      break;
    default:
      contentSubject = "THANK YOU";
  }

  return transporter.sendMail({
    from: '"LALA-LYCHEEE" <no-reply@lalalycheee1.com>',
    to: data.customerEmail,
    subject: contentSubject,
    html: data.emailHtmlBody
  });
}

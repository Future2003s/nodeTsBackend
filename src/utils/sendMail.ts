import nodemailer from "nodemailer";
import { google } from "googleapis";
import { TypeRequestBodyMail } from "~/services/mail.service";

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

  let contentSubject: string = "";

  switch (data.emailType) {
    case "confirmed":
      contentSubject = "ORDER CONFIRMATION";
      break;
    case "payment_received":
      contentSubject = "ORDER PAYMENT RECEIVED";
      break;
    case "shipped":
      contentSubject = "ORDER HAS BEEN DELIVERED TO THE SHIPPING UNIT";
      break;
    case "delivering":
      contentSubject = "YOUR ORDER IS BEING DELIVERED TODAY";
      break;
    default:
      contentSubject = "THANK YOU FOR CHOOSING OUR PRODUCT";
      break;
  }

  return {
    status: 200,
    data: contentSubject
  };

  // return transporter.sendMail({
  //   from: '"LALA-LYCHEEE" <no-reply@lalalycheee1.com>',
  //   to: data.customerEmail,
  //   subject: contentSubject,
  //   html: data.emailHtmlBody
  // });
}

import express, { Application, Request, Response } from "express";
import routes from "./routes/index.routes";
import cors from "cors";
import helmet from "helmet";
import envConfig from "./config/envConfig";
import instanceDatabase from "./database/init.mongodb";
import compression from "compression";
import ExceptionError from "./helpers/handleErrorGlobal";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const app: Application = express();
const port: number = envConfig.PORT;

const oAuth2Client = new google.auth.OAuth2(envConfig.CLIENT_ID, envConfig.CLIENT_SECRET, envConfig.REDIRECT_URI);

oAuth2Client.setCredentials({
    refresh_token: envConfig.REFRESH_TOKEN
});

const tamplateMail = () => {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Thông báo giao hàng - Đơn hàng của bạn đang đến!</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #fdf6f6;
            font-family: 'Quicksand', Arial, sans-serif;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #dddddd;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .content {
            padding: 30px;
            color: #333333;
            line-height: 1.7;
        }
        .signature {
            padding: 20px;
            background-color: #fff8f8;
            color: #333333;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            background-color: #d9534f;
            color: #ffffff;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin-top: 15px;
        }
    </style>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #fdf6f6; font-family: 'Quicksand', Arial, sans-serif;">
    <!-- TIÊU ĐỀ EMAIL ĐỀ XUẤT: 🚚 Giao hàng ngay hôm nay! Đơn hàng #[Mã đơn hàng] của bạn đang đến. -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fdf6f6;">
        <tr>
            <td align="center" style="padding: 20px 10px;">
                
                <table class="container" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #dddddd; box-shadow: 0 4px 15px rgba(0,0,0,0.05);" border="0" cellspacing="0" cellpadding="0">
                    
                    <tr>
                        <td style="padding: 30px 0; text-align: center; background-color: #ffffff;">
                            <img src="https://d3enplyig2yenj.cloudfront.net/logo" alt="Logo LALA-LYCHEEE" style="max-width: 200px; height: auto;">
                        </td>
                    </tr>

                    <!-- NỘI DUNG CHÍNH VỚI WATERMARK -->
                    <tr>
                        <td align="center" class="content" background="https://i.imgur.com/a1689b.jpg" style="background-position: center; background-repeat: no-repeat; background-size: 250px; padding: 10px 40px 30px 40px;">
                            <!--[if gte mso 9]>
                            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:400px;">
                                <v:fill type="tile" src="https://i.imgur.com/a1689b.jpg" color="#ffffff" />
                                <v:textbox inset="0,0,0,0">
                            <![endif]-->
                            <div>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="background-color: rgba(255, 255, 255, 0.9); padding: 25px; border-radius: 8px; text-align: center;">
                                            <!-- BẮT ĐẦU NỘI DUNG VĂN BẢN -->
                                            <h2 style="color: #d9534f; margin-top: 0;">Đơn hàng đang trên đường đến!</h2>
                                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.7;">
                                                Thân gửi <strong>[Tên khách hàng]</strong>,
                                            </p>
                                            <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px;">
                                                Tin vui! Đơn hàng <strong>#[Mã đơn hàng]</strong> của bạn đã được giao cho đơn vị vận chuyển và sẽ được giao đến bạn <strong>trong ngày hôm nay</strong>.
                                            </p>
                                            <p style="margin: 0 0 25px 0; color: #333333; font-size: 16px;">
                                                Bạn vui lòng chuẩn bị và để ý điện thoại để nhận hàng từ shipper nhé!
                                            </p>
                                            
                                            <a href="[Link theo dõi đơn hàng]" class="button" style="display: inline-block; background-color: #d9534f; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px;">Theo dõi hành trình đơn hàng</a>

                                            <!-- KẾT THÚC NỘI DUNG VĂN BẢN -->
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if gte mso 9]>
                                </v:textbox>
                            </v:rect>
                            <![endif]-->
                        </td>
                    </tr>

                    <!-- Chữ ký Công ty -->
                    <tr>
                        <td class="signature" style="padding: 30px 40px; background-color: #fff8f8; color: #333333; font-size: 14px; border-top: 1px solid #fceeee; text-align: center;">
                            <p style="margin: 0;">Cảm ơn bạn đã mua sắm tại LALA-LYCHEEE!</p>
                            <p style="margin: 10px 0 0 0; font-weight: bold; color: #d9534f; font-size: 18px;">LALA-LYCHEEE</p>
                            <p style="margin: 0;"><strong></strong> <a href="[Link website công ty]" style="color: #d9534f; text-decoration: none; font-weight: bold;"></a></p>
                        </td>
                    </tr>
                </table>

                <table width="100%" style="max-width: 600px;" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 20px 0; font-size: 12px; color: #aaaaaa;">
                            <p style="margin: 0;">🐝 🍓 🐝 🍓 🐝</p>
                            <p style="margin: 10px 0 0 0;">Bạn nhận được email này vì đã đặt hàng tại LALA-LYCHEEE.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

const sendMail = async () => {
    try {
        const access_token = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "GMAIL",
            auth: {
                type: "OAuth2",
                user: "lalalycheee1@gmail.com",
                clientId: envConfig.CLIENT_ID,
                clientSecret: envConfig.CLIENT_SECRET,
                refreshToken: envConfig.REFRESH_TOKEN,
                accessToken: access_token.token as string
            }
        });

        return transport.sendMail({
            from: "TEST LALALYCHEEE",
            to: "yamasakijin2020@gmail.com@gmail.com",
            subject: "TEST",
            html: tamplateMail()
        });
    } catch (error) {
        console.log(error);
    }
};

app.use(
    cors({
        origin: ["http://localhost:3000", "https://lalalycheee.vn"],
        credentials: true
    })
);
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

app.get("/sendMail", (req: Request, res: Response) => {
    const testSendMail = sendMail();
    if (!testSendMail) {
        res.status(400).json({
            code: 400,
            content: "ERROR SEND MAIL"
        });
    }
    res.status(200).json({
        code: 200,
        content: "SEND MAIL SUCCESS"
    });
});

routes(app);

instanceDatabase;

app.listen(port, (): void => {
    console.log(`Listen at PORT http://localhost:${port}`);
});

// handller error
ExceptionError(app);

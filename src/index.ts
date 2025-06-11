import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./routes/index.routes";
import cors from "cors";
import PayOS from "@payos/node";
import envConfig, { API_URL } from "./config/envConfig";

const app: Application = express();
const port: number = 4000;

app.use(
    cors({
        origin: ["http://localhost:3000", "https://lalalycheee.vn"],
        credentials: true
    })
);
app.use(express.json());

routes(app);

const payOS = new PayOS(envConfig.YOUR_CLIENT_ID_PAY, envConfig.YOUR_API_KEY_PAY, envConfig.YOUR_CHECKSUM_KEY_PAY);

app.get("/", (req: Request, res: Response) => {
    console.log(API_URL);
    res.status(200).json({
        name: "OK",
        content: envConfig.PORT || "4000"
    });
});

app.post("/create-payment-link", async (req, res) => {
    const YOUR_DOMAIN = `https://lalalycheee.vn`;
    try {
        const body = {
            orderCode: Number(String(Date.now()).slice(-6)),
            amount: 2000,
            description: "Thanh toan don hang",
            items: [
                {
                    name: "Mì tôm Hảo Hảo ly",
                    quantity: 1,
                    price: 2000
                }
            ],
            returnUrl: `${YOUR_DOMAIN}/success.html`,
            cancelUrl: `${YOUR_DOMAIN}/cancel.html`
        };
        const paymentLinkResponse = await payOS.createPaymentLink(body);

        res.status(200).json(paymentLinkResponse);
    } catch (error: any) {
        res.status(error.status || 500).json({ error: true, message: error.message || "Lỗi không xác định" });
    }
});

app.listen(port, (): void => {
    console.log(`Listen at PORT http://localhost:${port}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
    const error: ErrorResponse = new Error("Not Found");
    const statusCode: number = 400;
    error.statusCode = statusCode;
    next(error);
});

app.use((error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({ code: error.statusCode, message: error.message || "Internal Server" });
});

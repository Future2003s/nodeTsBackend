import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./routes/index.routes";
import cors from "cors";
import PayOS from "@payos/node";

const app: Application = express();
const port: number = 4000;

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);
app.use(express.json());

routes(app);

const payOS = new PayOS(
    "ebf7258a-1c4f-4f67-b86a-c365a6e38afa",
    "e6947c87-eac3-4247-846d-305204d79666",
    "fb33de9fe20d30e9e5f9f3795af9b7161c62ffd3fc3393c01db92a1354047b85"
);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        name: "OK"
    });
});

app.post("/create-payment-link", async (req, res) => {
    const YOUR_DOMAIN = `https://lalalycheee.vn`;
    try {
        const paymentLinkResponse = await payOS.createPaymentLink({
            ...req.body,
            returnUrl: `${YOUR_DOMAIN}/payment-callback`,
            cancelUrl: `${YOUR_DOMAIN}/payment-callback`
        });

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

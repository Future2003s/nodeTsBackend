import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./routes/index.routes";
import cors from "cors";
import envConfig, { API_URL } from "./config/envConfig";
import instanceDatabase from "./database/init.mongodb";

const app: Application = express();
const port: number = 4000;

app.use(
    cors({
        origin: ["http://localhost:3000", "https://lalalycheee.vn"],
        credentials: true
    })
);
app.use(express.json());

instanceDatabase;

routes(app);

app.get("/", (req: Request, res: Response) => {
    console.log(API_URL);
    res.status(200).json({
        name: "OK",
        content: envConfig.PORT || "4000"
    });
});

app.listen(port, (): void => {
    console.log(`Listen at PORT http://localhost:${port}`);
});

// handller error

app.use((req: Request, res: Response, next: NextFunction) => {
    const error: ErrorResponse = new Error("Not Found");
    const statusCode: number = 400;
    error.statusCode = statusCode;
    next(error);
});

app.use((error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({ code: error.statusCode, message: error.message || "Internal Server" });
});

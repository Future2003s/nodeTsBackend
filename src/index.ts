import express, { Application } from "express";
import routes from "./routes/index.routes";
import cors from "cors";
import helmet from "helmet";
import envConfig from "./config/envConfig";
import instanceDatabase from "./database/init.mongodb";
import compression from "compression";
import ExceptionError from "./helpers/handleErrorGlobal";

const app: Application = express();
const port: number = envConfig.PORT;

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

routes(app);

instanceDatabase;

app.listen(port, (): void => {
    console.log(`Listen at PORT http://localhost:${port}`);
});

// handller error
ExceptionError(app);

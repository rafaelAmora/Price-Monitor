import express from "express";
import "express-async-errors";
import { errorHandling } from "./middlewares/errorHandling";
import { routes } from "./routes";
import { validationPrice } from "./scripts/validationPrice";
import cron from "node-cron";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandling);

export { app };

// Executa validationPrice a cada 5 horas (0 */5 * * *)
cron.schedule("0 */5 * * *", validationPrice);

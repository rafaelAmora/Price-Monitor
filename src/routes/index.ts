import { Router } from "express";
import { userRouter } from "./user-router";
import { productRouter } from "./product-router";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/product", productRouter);

export { routes };

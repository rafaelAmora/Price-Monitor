import { Router } from "express";
import { ProductController } from "../controllers/product";

const productRouter = Router();
const productController = new ProductController();

productRouter.post("/", productController.create);

export { productRouter };

import {Router} from "express";
import productRouter from "../resources/product/product.router.ts"

const router = Router();

router.use("/products",productRouter);

export default router;




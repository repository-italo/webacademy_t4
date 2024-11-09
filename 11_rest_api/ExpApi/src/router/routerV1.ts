import {Router} from "express";
import productRouter from "../resources/product/product.router.ts"
import userRouter from "../resources/user/user.router.ts"
const router = Router();

router.use("/products",productRouter);
router.use("/users", userRouter);
export default router;




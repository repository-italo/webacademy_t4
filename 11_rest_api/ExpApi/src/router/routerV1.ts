import {Router} from "express";
import productRouter from "../resources/product/product.router.ts"
import langRouter from "../resources/language/language.router.ts";
import userRouter from "../resources/user/user.router.ts";
import authRouter from "../resources/auth/auth.router.ts";

const router = Router();
router.use(
   "/products",
   // #swagger.tags = ['Product']
   productRouter);
router.use(
   "/users",
   // #swagger.tags = ['User']
   userRouter);
router.use(
   "/",
   // #swagger.tags = ['Language']
   langRouter);

router.use(
   "/",
   // #swagger.tags = ['Auth']
   authRouter);

export default router;




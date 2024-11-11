import {Router} from "express";
import { isAdmin } from "../../middlewares/isAdmin.ts";
import productController from "./product.controller.ts";
import productSchema from "./product.schema.ts";
import validate from "../../middlewares/validate.ts";

const router = Router();

router.get("/", productController.index);
router.post("/", isAdmin, validate(productSchema),productController.create);
router.get("/:id", productController.read);
router.put("/:id", isAdmin, validate(productSchema), productController.update);
router.delete("/:id", isAdmin, productController.remove);

export default router;
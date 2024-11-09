import {Router} from "express";

import productController from "./product.controller.ts";
import productSchema from "./product.schema.ts";
import validate from "../../middlewares/validate.ts";

const router = Router();

router.get("/", productController.index);
router.post("/", validate(productSchema),productController.create);
router.get("/:id", productController.read);
router.put("/:id", validate(productSchema), productController.update);
router.delete("/:id", productController.remove);

export default router;
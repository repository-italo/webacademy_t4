import {Router} from "express";
import userController from "./user.controller";
import validate from "../../middlewares/validate";
import userMiddleware from "./user.middleware.ts";
import userSchema from "./user.schema.ts";
const router = Router();


router.get("/", userController.index);
router.get("/:id", userController.read);
router.post(
   "/", 
   validate(userSchema), 
   userMiddleware.emailAlreadyExists, 
   userController.create);

router.put(
   "/:id", 
   validate(userSchema), 
   userMiddleware.emailAlreadyExists,  
   userController.update);
router.delete("/:id", userController.remove);

export default router;

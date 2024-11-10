import { Router } from "express";
import languageController from "./language.controller.ts";
import validate from "../../middlewares/validate.ts";
import languageSchema from "./language.schema.ts";
const router = Router();
router.post(
   '/languages', 
   validate(languageSchema) , 
   languageController.changeLanguage);

export default router;
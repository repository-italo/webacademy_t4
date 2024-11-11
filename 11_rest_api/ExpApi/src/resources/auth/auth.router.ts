import {Router} from "express"
import authController from "./auth.controller";
const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

export default router;
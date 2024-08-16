import { Router } from "express";
import homeController from "../controllers/home.controller";
import userController from "../controllers/user.controller";
import authController from "../controllers/auth.controller";

const router = Router();

// auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);

router.get("/", homeController.home);
router.get("/users", userController.findAll);

export default router;

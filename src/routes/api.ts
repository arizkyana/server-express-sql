import { Router } from "express";
import homeController from "../controllers/home.controller";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/", homeController.home);
router.get("/users", userController.findAll);

export default router;

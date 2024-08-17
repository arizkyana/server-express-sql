import { Router } from "express";

import authController from "../controllers/auth.controller";
import productController from "../controllers/product.controller";
import mediaController from "../controllers/media.controller";

import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import mediaMiddleware from "../middlewares/media.middleware";

const router = Router();

// auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);

// CRUD products
router.get("/products", productController.findAll);
router.post(
  "/products",
  [authMiddleware, aclMiddleware(["admin"])],
  productController.create
);
router.get("/products/:id", productController.findById);
router.get("/products/slug/:slug", productController.findBySlug);
router.put(
  "/products/:id",
  [authMiddleware, aclMiddleware(["admin"])],
  productController.update
);
router.delete(
  "/products/:id",
  [authMiddleware, aclMiddleware(["admin"])],
  productController.remove
);

router.post(
  "/media/upload-single",
  [authMiddleware, aclMiddleware(["admin", "user"]), mediaMiddleware.single],
  mediaController.single
); // single file
router.post(
  "/media/upload-multiple",
  [authMiddleware, aclMiddleware(["admin", "user"]), mediaMiddleware.multiple],
  mediaController.multiple
); // multiple files
router.delete(
  "/media/remove",
  [authMiddleware, aclMiddleware(["admin", "user"])],
  mediaController.remove
);

export default router;

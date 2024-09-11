import { Router } from "express";

import authController from "../controllers/auth.controller";
import productController from "../controllers/product.controller";
import mediaController from "../controllers/media.controller";
import courseController from "../controllers/course.controller";
import sectionController from "../controllers/section.controller";
import bundleController from "../controllers/bundle.controller";

import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import mediaMiddleware from "../middlewares/media.middleware";

const router = Router();

// auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);

// CRUD Course
router.post("/courses", authMiddleware, courseController.create);
router.get("/courses", courseController.findAll);
router.get("/courses/:id", courseController.findOne);
router.put(
  "/courses/:id",
  [authMiddleware, aclMiddleware(["admin"])],
  courseController.update
);
router.delete(
  "/courses/:id",
  [authMiddleware, aclMiddleware(["admin"])],
  courseController.remove
);

// CRUD Section
router.post("/sections", authMiddleware, sectionController.create);
router.get("/sections", sectionController.findAll);
router.get("/sections/:id", sectionController.findOne);
router.put(
  "/sections/:id",
  [authMiddleware, aclMiddleware(["admin"])],
  sectionController.update
);
router.delete(
  "/sections/:id",
  [authMiddleware, aclMiddleware(["admin"])],
  sectionController.remove
);

// CRUD Bundle
router.post("/bundles", authMiddleware, bundleController.create);
router.get("/bundles", bundleController.findAll);
router.get("/bundles/:id", bundleController.findOne);
router.put(
  "/bundles/:id",
  [authMiddleware, aclMiddleware(["admin"])],
  bundleController.update
);
router.delete(
  "/bundles/:id",
  [authMiddleware, aclMiddleware(["admin"])],
  bundleController.remove
);

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

router.get(
  "/users/products",
  [authMiddleware, aclMiddleware(["admin"])],
  productController.findByUser
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

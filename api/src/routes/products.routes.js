import { Router } from "express";
const router = Router();
import * as productsCtrl from "../controllers/products.controller";
import { authJwt } from "../middelewares";

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  productsCtrl.createProduct
);

router.get("/", productsCtrl.getProducts);

router.get("/:productId", productsCtrl.getProductById);

router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.updateProduct
);

router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.deleteProduct
);

export default router;
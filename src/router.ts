import { Router } from "express";
import { oneOf, body, validationResult } from "express-validator";
import { handleInputErrors, updateValidationRules } from "./modules/middleware";
import {
  getProducts,
  updateProduct,
  createProduct,
  getOneProduct,
  deleteProduct,
} from "./controllers/products";

const router = Router();

// Product routes

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);
router.put("/product/:id", (req, res) => {});
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

// Update routes

router.get("/update", (req, res) => {});
router.get("/update/:id", (req, res) => {});
router.put(
  "/update/:id",
  updateValidationRules,
  updateProduct,

  (req, res) => {}
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").optional().isString(),
  (req, res) => {}
);
router.delete("/update/:id", (req, res) => {});

// Update Point routes

router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req, res) => {}
);
router.post("/updatepoint", (req, res) => {});
router.delete("/updatepoint/:id", (req, res) => {});

export default router;

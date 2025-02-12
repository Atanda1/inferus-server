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
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./controllers/update";
import { create } from "domain";

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

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  updateValidationRules,
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").optional().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

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

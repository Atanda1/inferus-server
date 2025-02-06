import { ALL } from "dns";
import prisma from "../db";

// GET ALL PRODUCTS
export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  });

  return res.json({
    message: "Update successful",
    data: { updated },
  });
};

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

// GET ONE PRODUCT
export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id as string,
    },
  });
    
  res.json({ data: product });
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id as string,
    },
  });

  res.json({ data: product });
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });

  res.json({ message: "Product deleted", data: deleted });
};

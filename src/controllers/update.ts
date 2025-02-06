import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      productId: req.body.id,
    },
  });

  res.json({ data: update });
};

export const getUpdates = async (req, res) => {
  const updates = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const totalUpdates = updates.reduce((acc, product) => {
    return [...acc, ...product.updates];
  }, []);

  res.json({ data: totalUpdates });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.user.id,
    },
  });
};

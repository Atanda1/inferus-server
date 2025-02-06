import prisma from "../db";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });
    const token = createJWT(user); 
    res.json({ token });
};

export const signin = async (req, res) => {
  
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    },
  });

  if (user) {
    const isValid = await comparePasswords(req.body.password, user.password);
    if (isValid) {
      const token = createJWT(user);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
}



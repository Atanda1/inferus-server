import { verify } from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';



const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = async (password) => {
   return await bcrypt.hash(password, 5) 
}

export const createJWT = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [, token] = bearer.split("");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "invalid token" });
  }
};

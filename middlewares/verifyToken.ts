import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import user from "../src/database/models/usersModal";

interface CustomRequest extends Request {
  user?: string | jwt.JwtPayload; // Adjust the type based on your needs
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_KEY}`);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token provided" });
  }
};

export default verifyToken;

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import { sequelize } from "../../../database/config/config";
import userModal from "../../../database/models/usersModal";

// Import repository
import usersRepository from "../repository/usersRepository";
import { error } from "console";

// Create User
const postUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userExists = await usersRepository.getUserByUsername(username);
  if (userExists) {
    return res
      .status(404)
      .json({ success: false, message: "User arleady exists" });
  }

  const user = await usersRepository.createUser(username, password);
  console.log(user);
  res.status(201).json({ success: true, message: "Posting user succed", user });
};

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  const users = await usersRepository.getAllUsers();
  if (!users) {
    return res.status(404).json({ success: false, message: "No user found" });
  }
  res.status(200).json({ success: true, message: "Users retrieved", users });
};

// Login User
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const checkUser = await usersRepository.getUserByUsername(username);
    if (!checkUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(
      password,
      (checkUser as unknown as { password: string }).password
    );
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invald Username or password" });
    }
    const token = jwt.sign(
      { userId: (checkUser as unknown as { id: string }).id },
      `${process.env.JWT_KEY}`,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Login Succed",
        token,
        username: (checkUser as unknown as { username: string }).username,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error occured", error });
  }
};

export default { postUser, getAllUsers, loginUser };

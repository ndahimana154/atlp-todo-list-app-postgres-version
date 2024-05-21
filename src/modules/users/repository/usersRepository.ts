import { where } from "sequelize";
import bcrypt from "bcrypt";

import { sequelize } from "../../../database/config/config";
import userModal from "../../../database/models/usersModal";

// Get user by username Function
const getUserByUsername = async (username: string) => {
  const user = userModal.findOne({ where: { username: username } });
  return user;
};

// Create user function
const createUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModal.create({
    username: username,
    password: hashedPassword,
  });
  return user;
};

// Get all users function
const getAllUsers = async () => {
    return userModal.findAll({order:[
        ['createdAt','DESC']
    ]})
};
export default {
  getUserByUsername,
  createUser,
  getAllUsers,
};

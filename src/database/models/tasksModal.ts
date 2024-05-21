import { DataType, DataTypes } from "sequelize";
import { sequelize } from "../config/config";

// import userModal from "./usersModal";

const task = sequelize.define(
  "task",
  {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: userModal, // Reference the User model
      //   key: "id", // Reference the id column in the User model
      // },
    },
  },
  { timestamps: true }
);

export default task;

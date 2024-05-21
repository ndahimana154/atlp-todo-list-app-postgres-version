import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

// import "../models/associations";
// import user from "../models/usersModal";
// import task from "../models/tasksModal";


export const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: "postgres",
  }
);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};

export const syncDatabase = async () => {
  sequelize.sync({ force: false });
};

export default sequelize;

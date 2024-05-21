import { DataType, DataTypes } from "sequelize";

import { sequelize } from "../config/config";

const user = sequelize.define(
  "user",
  {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
  },
  { timestamps: true }
);

// (async () => {
//   await sequelize.sync({ alter: true });
// })();


export default user
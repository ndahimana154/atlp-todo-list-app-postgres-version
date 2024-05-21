import express from "express";
import dotenv from "dotenv";

import routes from "./router/index";
import {
  sequelize,
  connectToDatabase,
  syncDatabase,
} from "./database/config/config";
dotenv.config();

// Sync database and connect DB
connectToDatabase();
syncDatabase();

const app = express();

const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to my todo list app" });
});

app.listen(port, () =>
  console.log(`App listening on PORT: http://localhost:${port}`)
);

export default app;

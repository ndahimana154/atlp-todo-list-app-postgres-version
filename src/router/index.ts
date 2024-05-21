import express, { Router } from "express";

import usersRoutes from "./usersRoutes";
import tasksRouter from "./tasksRouter";

const routes = express.Router();

// Users  route
routes.use("/users", usersRoutes);

// Tasks route
routes.use("/tasks", tasksRouter);

export default routes;

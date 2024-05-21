import express, { Router } from "express";

import tasksController from "../modules/tasks/controller/tasksController";
import verifyToken from "../../middlewares/verifyToken";

const tasksRouter: Router = express.Router();

// Post task
tasksRouter.post("/new/:id", verifyToken, tasksController.postTask);

// Get all tasks
tasksRouter.get("/", tasksController.getAllTasks);

// Get task by User id
tasksRouter.get("/user/:id", tasksController.getTaskByUser);

// Delete task
tasksRouter.delete("/:id", tasksController.deleteTaskById);

// Update task
tasksRouter.patch("/:id",tasksController.updateTaskById)
export default tasksRouter;

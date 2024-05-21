import { Request, Response } from "express";

import taskRepository from "../repository/taskRepository";

// Create a task
const postTask = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { title, description } = req.body;
  try {
    const newTask = await taskRepository.createTask(
      Number(userId),
      title,
      description
    );
    if (!newTask) {
      return res
        .status(401)
        .json({ success: false, message: "Task not created!" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Task created!", newTask });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Error occured", error });
  }
};

// Get all tasks
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskRepository.getTasks();
    if (tasks.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: "No tasks found" });
    }
    res.status(200).json({ success: true, message: "Tasks retrieved", tasks });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error occured", error });
  }
};

const getTaskByUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const tasks = await taskRepository.getTasksByUser(Number(userId));
    if (tasks.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: "No tasks found" });
    }
    res.status(200).json({ success: true, message: "Tasks retrieved", tasks });
  } catch (error) {
    res.status(200).json({ success: false, message: "Error occured", error });
  }
};

// Delete task by ID
const deleteTaskById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const task = await taskRepository.getOneTask(Number(id));
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    const deleted = await taskRepository.deleteOneTask(Number(id));
    if (!deleted) {
      return res
        .status(401)
        .json({ success: false, message: "Deleting failed" });
    }
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(401).json({ success: false, message: "Error occured", error });
  }
};

// Update task by Id
const updateTaskById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    const task = await taskRepository.getOneTask(Number(id));
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    const update = await taskRepository.updateTask(
      Number(id),
      title,
      description
    );
    res.json({ update });
  } catch (error) {
    res.status(401).json({ success: false, message: "Error occured", error });
  }
};
export default {
  postTask,
  getAllTasks,
  getTaskByUser,
  deleteTaskById,
  updateTaskById,
};

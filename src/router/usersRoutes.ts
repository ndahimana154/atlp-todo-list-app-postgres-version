import express, { Router } from "express";

//
import usersController from "../modules/users/controller/usersController";

const usersRouter: Router = express.Router();

// Create user
usersRouter.post("/", usersController.postUser);

// Get all users
usersRouter.get("/", usersController.getAllUsers);

// Login User
usersRouter.post("/login", usersController.loginUser);

export default usersRouter;

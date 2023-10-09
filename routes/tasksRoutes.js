import express from "express";
import { getTasks, addTask, deleteTask } from "../controllers/taskController.js";
import { login, register, start } from "../controllers/authController.js";

const router = express.Router();

router.get("/todolist", getTasks);
router.post("/todolist/submit", addTask);
router.post("/todolist/delete", deleteTask);

// *auth
router.get("/", start);
router.get("/register", register);
router.get("/login", login);

export { router as tasksRoutes };

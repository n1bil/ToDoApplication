import express from "express";
import { getTasks, addTask, deleteTask } from "../controllers/taskController.js";
import { start } from "../controllers/authController.js";

const router = express.Router();

router.get("/todolist", getTasks);
router.post("/todolist/submit", addTask);
router.post("/todolist/delete", deleteTask);

// *auth
router.get("/", start);

export { router as tasksRoutes };

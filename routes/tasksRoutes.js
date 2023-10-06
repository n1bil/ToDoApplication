import express from "express";
import { getTasks, addTask, deleteTask } from "../controllers/taskController.js"; 

const router = express.Router();

router.get("/", getTasks);
router.post("/submit", addTask);
router.post("/delete", deleteTask);

export { router as tasksRoutes };

// routes/calendarRoutes.js

import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/calendarController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated); 

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);        
router.post("/delete/:id", deleteTask); 

export default router;

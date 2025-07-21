import express from "express";
import {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
} from "../controllers/todo.Controller.js"

import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated); // protect all routes

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/toggle",isAuthenticated, toggleTodo);

export default router;

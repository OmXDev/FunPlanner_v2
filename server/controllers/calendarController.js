// controllers/calendar.controller.js

import { Task } from "../models/calendar.model.js";

// GET all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({user:req.user._id}).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
};

// POST create task
export const createTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const newTask = new Task({...req.body, user:userId});
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: "Failed to create task", error: err.message });
  }
};

// POST update task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: "Failed to update task", error: err.message });
  }
};

// POST delete task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
};

// models/calendar.model.js

import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    dueDate: { type: Date, required: true },
    assignedTo: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);

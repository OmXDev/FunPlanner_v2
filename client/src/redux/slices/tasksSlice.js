import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../lib/axios"

// Define the state for tasks
const initialState = {
  tasks: [],
  status: "idle",
  error: null,
}

// Async Thunks for API interaction
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axiosInstance.get("/tasks", {
      withCredentials: true,
    })
  return response.data
  
})

export const addTask = createAsyncThunk("tasks/addTask", async (newTask) => {
  const response = await axiosInstance.post("/tasks", newTask)
  return response.data
})

export const updateTask = createAsyncThunk("tasks/updateTask", async (updatedTask) => {
  const response = await axiosInstance.patch(`/tasks/${updatedTask._id}`, updatedTask) // Using POST for update as per example
  return response.data
})

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId) => {
  await axiosInstance.post(`/tasks/delete/${taskId}`) // Using POST for delete as per example
  return taskId
})

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch tasks"
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload)
      })
  },
})

export default tasksSlice.reducer

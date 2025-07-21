import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios'

// 📥 Fetch all todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/todos', {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to fetch todos');
  }
});

// ➕ Add a new todo
export const createTodo = createAsyncThunk('todos/createTodo', async ({ text, priority }, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/todos', { text, priority });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to add todo');
  }
});

// ✅ Toggle completion
export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.patch(`/todos/${id}/toggle`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to toggle todo');
  }
});

// ❌ Delete a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(`/todos/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to delete todo');
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload); // Add to top
      })
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(toggleTodo.fulfilled, (state, action) => {
        const idx = state.todos.findIndex((todo) => todo._id === action.payload._id);
        if (idx !== -1) {
          state.todos[idx] = action.payload;
        }
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;

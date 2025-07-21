import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import todoReducer from './slices/todoSlice';
import tasksReducer from './slices/tasksSlice';
import calendarReducer from './slices/calendarSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    todos: todoReducer,
    tasks: tasksReducer,
    calendar: calendarReducer,
  },
});

export default store;

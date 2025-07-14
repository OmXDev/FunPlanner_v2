"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  createTodo,
} from "../redux/slices/todoSlice";

import AddTodoForm from "../components/Todo/AddTodoForm";
import TodoList from "../components/Todo/TodoList";
import { CheckSquare, ListTodo } from "lucide-react";
import Topbar from "../components/ui/Topbar";

const TodoLayout = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#161b22] text-white">
      <Topbar />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
              <ListTodo className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Task Manager
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Stay organized and get things done
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckSquare className="w-5 h-5 text-green-400" />
              Completed: <span className="font-semibold text-white">{completedCount}</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-slate-600"></div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <ListTodo className="w-5 h-5 text-blue-400" />
              Total: <span className="font-semibold text-white">{totalCount}</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-slate-600"></div>

            <div className="flex-1 w-full">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="font-semibold text-white">{progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task */}
        <AddTodoForm
          onAddTodo={(text, priority) => dispatch(createTodo({ text, priority }))}
        />

        {/* Task List */}
        <TodoList />
      </main> 
    </div>
  );
};

export default TodoLayout;

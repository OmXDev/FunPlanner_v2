"use client"

import { useState } from "react"
import TodoItem from "./TodoItem"
import { Search, SortAsc, CheckSquare, Square, AlertTriangle } from "lucide-react"
import { fetchTodos, toggleTodo, deleteTodo } from "../../redux/slices/todoSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const TodoList = () => {
    const [filter, setFilter] = useState("all") // all, active, completed
    const [sortBy, setSortBy] = useState("newest") // newest, oldest, priority
    const [searchTerm, setSearchTerm] = useState("")
    const dispatch = useDispatch()

    const { todos } = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    // Filter todos based on completion status
    const getFilteredTodos = () => {
    let filtered = todos;

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter((todo) =>
            todo.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Apply completion filter
    switch (filter) {
        case "active":
            filtered = filtered.filter((todo) => !todo.completed);
            break;
        case "completed":
            filtered = filtered.filter((todo) => todo.completed);
            break;
        default:
            break;
    }

    // Separate active and completed todos
    const activeTodos = filtered.filter((todo) => !todo.completed);
    const completedTodos = filtered.filter((todo) => todo.completed);

    // Sort each group independently
    const sortByDate = (a, b, order = "desc") =>
        order === "asc"
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);

    const sortByPriority = (a, b) => {
        const priorityOrder = { high: 3, normal: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    };

    switch (sortBy) {
        case "oldest":
            activeTodos.sort((a, b) => sortByDate(a, b, "asc"));
            completedTodos.sort((a, b) => sortByDate(a, b, "asc"));
            break;
        case "priority":
            activeTodos.sort(sortByPriority);
            completedTodos.sort(sortByPriority);
            break;
        default: // newest
            activeTodos.sort((a, b) => sortByDate(a, b, "desc"));
            completedTodos.sort((a, b) => sortByDate(a, b, "desc"));
            break;
    }

    return [...activeTodos, ...completedTodos]; // Completed always at bottom
};


    const filteredTodos = getFilteredTodos()
    const activeCount = todos.filter((todo) => !todo.completed).length
    const completedCount = todos.filter((todo) => todo.completed).length

    const filterOptions = [
        { value: "all", label: "All Tasks", icon: <Square className="w-4 h-4" />, count: todos.length },
        { value: "active", label: "Active", icon: <AlertTriangle className="w-4 h-4" />, count: activeCount },
        { value: "completed", label: "Completed", icon: <CheckSquare className="w-4 h-4" />, count: completedCount },
    ]

    const sortOptions = [
        { value: "newest", label: "Newest First" },
        { value: "oldest", label: "Oldest First" },
        { value: "priority", label: "By Priority" },
    ]

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search tasks..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex bg-slate-700/50 rounded-xl p-1">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setFilter(option.value)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${filter === option.value
                                        ? "bg-purple-600 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-slate-600/50"
                                    }`}
                            >
                                {option.icon}
                                <span className="hidden sm:inline">{option.label}</span>
                                <span className="bg-slate-600 text-xs px-1.5 py-0.5 rounded-full">{option.count}</span>
                            </button>
                        ))}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Results Info */}
            {(searchTerm || filter !== "all") && (
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                        Showing {filteredTodos.length} of {todos.length} tasks
                        {searchTerm && ` matching "${searchTerm}"`}
                    </span>
                    {(searchTerm || filter !== "all") && (
                        <button
                            onClick={() => {
                                setSearchTerm("")
                                setFilter("all")
                            }}
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            )}

            {/* Todo List */}
            <div className="space-y-3">
                {filteredTodos.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckSquare className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-300 mb-2">
                            {searchTerm
                                ? "No tasks found"
                                : filter === "completed"
                                    ? "No completed tasks"
                                    : filter === "active"
                                        ? "No active tasks"
                                        : "No tasks yet"}
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm
                                ? "Try adjusting your search terms"
                                : filter === "completed"
                                    ? "Complete some tasks to see them here"
                                    : filter === "active"
                                        ? "All tasks are completed!"
                                        : "Add your first task to get started"}
                        </p>
                    </div>
                ) : (
                    filteredTodos.map((todo, index) => (
                        <div
                            key={todo.id}
                            className="animate-in slide-in-from-left-2 duration-200"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <TodoItem todo={todo} onToggle={(id) => dispatch(toggleTodo(id))} onDelete={(id) => dispatch(deleteTodo(id))} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default TodoList

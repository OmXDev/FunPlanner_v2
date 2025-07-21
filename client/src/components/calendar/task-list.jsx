"use client"
import { Edit, Trash } from "lucide-react"
import { cn } from "../../lib/utils"

export function TaskList({ tasks, onEditTask, onDeleteTask, onUpdateTask }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">No tasks for this day. Add one below!</p>
  }

  const handleToggleComplete = (task) => {
    onUpdateTask({ ...task, completed: !task.completed })
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tasks:</h3>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            "flex items-center justify-between p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
            task.completed && "opacity-70 line-through text-gray-500 dark:text-gray-400",
          )}
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.completed}
              onChange={() => handleToggleComplete(task)}
              className="peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 dark:border-gray-700 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
            />
            <label htmlFor={`task-${task.id}`} className="grid gap-1.5 leading-none cursor-pointer">
              <span className="text-base font-medium">{task.title}</span>
              {task.description && <span className="text-sm text-gray-500 dark:text-gray-400">{task.description}</span>}
              <span className="text-xs text-gray-500 dark:text-gray-400">Assigned to: {task.assignedTo}</span>
            </label>
          </div>
          <div className="flex space-x-1">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => onEditTask(task)}
              aria-label="Edit task"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
              onClick={() => onDeleteTask(task._id)}
              aria-label="Delete task"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

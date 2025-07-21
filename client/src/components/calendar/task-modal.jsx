"use client"
import { TaskForm } from "./task-form"
import { TaskList } from "./task-list"
import { X } from "lucide-react"

export function TaskModal({
    isOpen,
    onClose,
    selectedDate,
    tasksForSelectedDate,
    onAddTask,
    onUpdateTask,
    onDeleteTask,
    editingTask,
    onEditTask,
}) {
    if (!isOpen) return null

    const modalTitle = editingTask ? "Edit Task" : selectedDate ? `Tasks for ${selectedDate}` : "Add New Task"
    const modalDescription = editingTask
        ? "Modify the details of your task."
        : selectedDate
            ? "View, add, or manage tasks for this day."
            : "Create a new task."

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{modalTitle}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{modalDescription}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="grid gap-4 py-4">
                    {editingTask || !selectedDate ? (
                        <TaskForm
                            initialData={editingTask}
                            onSubmit={(taskData) => {
                                if (editingTask) {
                                    onUpdateTask({ ...editingTask, ...taskData })
                                } else {
                                    onAddTask(taskData)
                                }
                                onClose()
                            }}
                            onCancel={onClose}
                            defaultDueDate={
                                editingTask?.dueDate
                                    ? editingTask.dueDate.split("T")[0] // ensure it's in "YYYY-MM-DD" format for input[type="date"]
                                    : selectedDate || new Date().toISOString().split("T")[0]
                            }
                        />

                    ) : (
                        <>
                            <TaskList
                                tasks={tasksForSelectedDate}
                                onEditTask={onEditTask}
                                onDeleteTask={onDeleteTask}
                                onUpdateTask={onUpdateTask}
                            />
                            <TaskForm
                                initialData={null}
                                onSubmit={(newTask) => {
                                    onAddTask(newTask)
                                }}
                                onCancel={onClose}
                                defaultDueDate={selectedDate}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

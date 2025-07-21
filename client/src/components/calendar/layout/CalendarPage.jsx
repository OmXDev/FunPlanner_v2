"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTasks, addTask, updateTask, deleteTask } from "../../../redux/slices/tasksSlice"
import { nextMonth, prevMonth, setSelectedDate, setCurrentMonthAndYear } from "../../../redux/slices/calendarSlice"
import { CalendarHeader } from "../calendar-header"
import { CalendarGrid } from "../calendar-grid"
import { TaskModal } from '../task-modal'
import { Plus } from "lucide-react"
import { formatDateLocal } from "../../../lib/utils"
import Topbar from "../../ui/Topbar"
import Sidebar from "../../UserDashboard/pages/Sidebar"

export default function CalendarPage() {
  const dispatch = useDispatch()
    const [sidebarVisible, setSidebarVisible] = useState(false)
  
  const { tasks, status, error } = useSelector((state) => state.tasks)
  const { currentMonth, currentYear, selectedDate } = useSelector((state) => state.calendar)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks())
    }
  }, [dispatch, status])

  const handlePrevMonth = () => {
    dispatch(prevMonth())
  }

  const handleNextMonth = () => {
    dispatch(nextMonth())
  }

  const handleDateSelect = (date) => {
  const formattedDate = formatDateLocal(new Date(date));
  dispatch(setSelectedDate(formattedDate));
  setIsModalOpen(true);
};

  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask))
  }

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask))
  }

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId))
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
    dispatch(setSelectedDate(null)) // Clear selected date when modal closes
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    dispatch(setSelectedDate(task.dueDate)) // Set selected date to task's due date
    setIsModalOpen(true)
  }

  const handleNewTaskClick = () => {
    setEditingTask(null)
    dispatch(setSelectedDate(null)) // Clear any previously selected date
    setIsModalOpen(true)
  }
const getTasksForDate = (date) => {
  const normalizedDate = typeof date === "string" ? date : formatDateLocal(date);
  return tasks.filter((task) => {
    const taskDate = formatDateLocal(new Date(task.dueDate)); // <-- normalize DB date too
    return taskDate === normalizedDate;
  });
};


  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700 dark:text-gray-300">
        Loading tasks...
      </div>
    )
  if (status === "failed")
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>

  return (
    <div className="min-h-screen bg-[#161b22]  text-white flex flex-col">
      <div className="sticky top-0 z-40 bg-[#0d1117] border-b border-gray-800">
        <Topbar />
      </div>
      <div className="flex-shrink-0">
        <div className="flex-shrink-0">
        <Sidebar onToggle={(visible) => setSidebarVisible(visible)} />
      </div>
        <div className=" p-5">
      <div className={` max-w-6xl flex-1 mx-auto bg-gray-900/50 py-5 sm:p-5 lg:p-6   ${sidebarVisible? "lg:ml-72":"lg:ml-52"} overflow-hidden`}>
        <CalendarHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={() => {
            const today = new Date()
            dispatch(setCurrentMonthAndYear({ month: today.getMonth(), year: today.getFullYear() }))
            dispatch(setSelectedDate(null))
          }}
        />
        <CalendarGrid
          currentMonth={currentMonth}
          currentYear={currentYear}
          onDateSelect={handleDateSelect}
          tasks={tasks}
        />
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNewTaskClick}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-[#2E3192] to-[] text-white hover:opacity-90 h-10 w-48 px-4 py-2 cursor-pointer"
          >
            <Plus className="mr-3 h-4 w-4" /> Add  New  Task
          </button>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        tasksForSelectedDate={selectedDate ? getTasksForDate(selectedDate) : []}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        editingTask={editingTask}
        onEditTask={handleEditTask}
      />
    </div>
      </div>
    </div>
  )
}

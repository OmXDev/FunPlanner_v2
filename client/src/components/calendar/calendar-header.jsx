"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function CalendarHeader({ currentMonth, currentYear, onPrevMonth, onNextMonth, onToday }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={onPrevMonth}
        aria-label="Previous month"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-100">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={onToday}
          className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 underline"
        >
          Today
        </button>
      </div>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={onNextMonth}
        aria-label="Next month"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

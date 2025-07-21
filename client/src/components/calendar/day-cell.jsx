"use client"
import { cn } from '../../lib/utils'

export function DayCell({ day, date, isToday, taskCount, onSelect }) {
  return (
    <div
      className={cn(
        "relative lg:h-24 h-16 p-2 flex flex-col items-center justify-between rounded-md cursor-pointer transition-colors",
        "bg-gray-200/30 hover:bg-gray-200/50 dark:bg-gray-700/30 dark:hover:bg-gray-700/50",
        isToday && "border-2 border-blue-900",
        taskCount > 0 && "bg-blue-100/30 hover:bg-blue-100/50 dark:bg-blue-900/30 dark:hover:bg-blue-900/50",
      )}
      onClick={() => onSelect(date)}
    >
      <span className={cn("font-bold text-lg", isToday && "text-[2a2b45]")}>{day}</span>
      {taskCount > 0 && (
        <div className="absolute bottom-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-[#2E3192] to-[] text-white text-xs font-medium">
          {taskCount}
        </div>
      )}
    </div>
  )
}

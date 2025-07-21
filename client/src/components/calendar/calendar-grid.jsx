"use client"
import { DayCell } from './day-cell'
import { formatDateLocal } from '../../lib/utils'

export function CalendarGrid({ currentMonth, currentYear, onDateSelect, tasks }) {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay() // 0 for Sunday, 1 for Monday

    const days = []
    // Fill leading empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="p-2" />)
    }

    // Fill days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i)
        const formattedDate = formatDateLocal(date)
        const tasksForDay = tasks.filter(
            (task) => formatDateLocal(new Date(task.dueDate)) === formattedDate
        )
        const isToday = new Date().toDateString() === date.toDateString()

        days.push(
            <DayCell
                key={i}
                day={i}
                date={formattedDate}
                isToday={isToday}
                taskCount={tasksForDay.length}
                onSelect={onDateSelect}
            />,
        )
    }

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <div className="grid grid-cols-8 gap-1 text-center">
            {dayNames.map((name) => (
                <div key={name} className="font-semibold text-muted-foreground py-2">
                    {name}
                </div>
            ))}
            {days}
        </div>
    )
}

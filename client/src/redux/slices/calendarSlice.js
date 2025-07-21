import { createSlice } from "@reduxjs/toolkit"

const today = new Date()
const initialState = {
  currentMonth: today.getMonth(),
  currentYear: today.getFullYear(),
  selectedDate: null,
}

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentMonthAndYear: (state, action) => {
      state.currentMonth = action.payload.month
      state.currentYear = action.payload.year
    },
    nextMonth: (state) => {
      if (state.currentMonth === 11) {
        state.currentMonth = 0
        state.currentYear += 1
      } else {
        state.currentMonth += 1
      }
    },
    prevMonth: (state) => {
      if (state.currentMonth === 0) {
        state.currentMonth = 11
        state.currentYear -= 1
      } else {
        state.currentMonth -= 1
      }
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
  },
})

export const { setCurrentMonthAndYear, nextMonth, prevMonth, setSelectedDate } = calendarSlice.actions
export default calendarSlice.reducer

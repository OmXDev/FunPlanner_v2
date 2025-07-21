"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"

export function TaskForm({ initialData, onSubmit, onCancel, defaultDueDate }) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [dueDate, setDueDate] = useState(initialData?.dueDate || defaultDueDate || "")
  const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || "Self")
  const [completed, setCompleted] = useState(initialData?.completed || false)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setDueDate(initialData.dueDate ? initialData.dueDate.split("T")[0] : "")
      setAssignedTo(initialData.assignedTo)
      setCompleted(initialData.completed)
    } else {
      setTitle("")
      setDescription("")
      setDueDate(defaultDueDate || "")
      setAssignedTo("Self")
      setCompleted(false)
    }
  }, [initialData, defaultDueDate])

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!title || !dueDate) {
    toast.error("Title and Due Date are required!");
    return;
  }

  const newTask = {
    title,
    description,
    dueDate,
    assignedTo: assignedTo || "Self",
    completed: false,
  };

  const submissionPromise = new Promise((resolve, reject) => {
    try {
      onSubmit(newTask); // Assumes this triggers async thunk or successful dispatch
      resolve();
    } catch (err) {
      reject("Failed to create task.");
    }
  });

  toast.promise(
    submissionPromise,
    {
      loading: "Creating task...",
      success: "Task created successfully ",
      error: (err) => err || "Failed to create task ",
    },
    {
      style: { minWidth: "250px" },
      success: { duration: 4000 },
      error: { duration: 4000 },
    }
  );
};



  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label
          htmlFor="title"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Task Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Finish project report"
          required
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="description"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Details about the task..."
          className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label
            htmlFor="dueDate"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className=" flex h-10 w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="assignedTo"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Assigned To
          </label>
          <input
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="e.g., Self, John Doe"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 dark:border-gray-700 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
        />
        <label
          htmlFor="completed"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Mark as Completed
        </label>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 h-10 px-4 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
        >
          {initialData ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  )
}

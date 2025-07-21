"use client"

import { useState } from "react"
import { Plus, AlertCircle, Flag, Zap } from "lucide-react"
import { createTodo } from "../../redux/slices/todoSlice"
import { useDispatch } from "react-redux"

const AddTodoForm = ({ onAddTodo }) => {
    const [text, setText] = useState("")
    const [priority, setPriority] = useState("normal")
    const [isExpanded, setIsExpanded] = useState(false)
    const dispatch = useDispatch()


    const handleSubmit =  (e) => {
  e.preventDefault();
  if (text.trim()) {
    const result =  dispatch(createTodo({ text: text.trim(), priority }));

    if (createTodo.fulfilled.match(result)) {
      setText("");
      setPriority("normal");
      setIsExpanded(false);
    } else {
      console.error("Failed to add todo:", result.payload || result.error);
    }
  }
};


    const priorityOptions = [
        {
            value: "low",
            label: "Low Priority",
            icon: <Flag className="w-4 h-4" />,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/30",
        },
        {
            value: "normal",
            label: "Normal Priority",
            icon: <AlertCircle className="w-4 h-4" />,
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/10",
            borderColor: "border-yellow-500/30",
        },
        {
            value: "high",
            label: "High Priority",
            icon: <Zap className="w-4 h-4" />,
            color: "text-red-400",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-500/30",
        },
    ]

    const selectedPriority = priorityOptions.find((option) => option.value === priority)

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 transition-all duration-300 hover:border-slate-600">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Field */}
                <div className="relative">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        placeholder="What needs to be done?"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                    {text && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <span className="text-xs text-gray-500">{text.length}/100</span>
                        </div>
                    )}
                </div>

                {/* Priority Selection - Shows when expanded */}
                {(isExpanded || text) && (
                    <div className="animate-in slide-in-from-top-2 duration-200">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Priority Level</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {priorityOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setPriority(option.value)}
                                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-200 hover:scale-105 ${priority === option.value
                                        ? `${option.bgColor} ${option.borderColor} ${option.color}`
                                        : "bg-slate-700/50 border-slate-600 text-gray-400 hover:border-slate-500"
                                        }`}
                                >
                                    {option.icon}
                                    <span className="text-sm font-medium">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#2E3192] to-[#989aec] text-white px-6 py-3 rounded-xl 
                        font-semibold hover:from-[#2E3192] hover:to-[] disabled:opacity-70 disabled:cursor-not-allowed transition-all 
                        duration-200 transform hover:scale-105 disabled:hover:scale-100"
                    >
                        <Plus className="w-4 h-4" />
                        Add Task
                    </button>

                    {(isExpanded || text) && (
                        <button
                            type="button"
                            onClick={() => {
                                setText("")
                                setPriority("normal")
                                setIsExpanded(false)
                            }}
                            className="px-4 py-3 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {/* Selected Priority Indicator */}
                {text && (
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">Priority:</span>
                        <div className={`flex items-center gap-1 ${selectedPriority.color}`}>
                            {selectedPriority.icon}
                            <span>{selectedPriority.label}</span>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default AddTodoForm

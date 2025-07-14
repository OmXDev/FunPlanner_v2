"use client"

import { Search, Plus, LayoutGrid, Bell, Slack, Menu, AlignJustify, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"

const Topbar = () => {
  const authUser = useSelector((state) => state.auth.authUser)
  const [activeTab, setActiveTab] = useState("All issues")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  return (
    <div className="h-14 flex items-center justify-between px-4 lg:px-6 bg-[#0d1117] border-b border-gray-800">
      {/* Left: Logo + Controls */}
      <div className="flex items-center space-x-4 flex-1 min-w-0 pl-14 sm:pl-0">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <a href="/" className="flex items-center space-x-2 group">
            <Slack className="w-8 h-8 text-white" />
            <span className=" text-lg font-semibold tracking-wide hidden sm:inline-block">Fun Planner</span>
          </a>
        </div>


        {/* Search */}
        <div className="relative flex-1/3 ml-20 max-w-md hidden md:block">
          <Search
            className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${isSearchFocused ? "text-blue-400" : "text-gray-400"
              }`}
          />
          <input
            type="text"
            placeholder="Search events, tasks, or anything..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-full bg-gray-800/50 border rounded-lg pl-10 pr-4 py-2 text-sm transition-all duration-200 focus:outline-none ${isSearchFocused
              ? "border-blue-500 bg-gray-800 shadow-lg shadow-blue-500/10"
              : "border-gray-700 hover:border-gray-600"
              }`}
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        {/* Mobile Search Button */}
        <button className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200">
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 group">
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Grid View */}
        <div className="flex items-center gap-2 cursor-pointer group">
          {/* Avatar or Initials */}
          <div className="relative w-8 h-8">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-700 text-white flex items-center justify-center font-semibold text-xs uppercase border border-slate-600">
              {authUser?.profilePic ? (
                <img
                  src={authUser.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{authUser?.fullname?.charAt(0)}</span>
              )}
            </div>
          </div>

          {/* Full Name */}
          <span className="text-sm font-medium hidden sm:block">
            {authUser?.fullname || "User"}
          </span>

          {/* Dropdown icon */}
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white" />
        </div>


      </div>
    </div>
  )
}

export default Topbar

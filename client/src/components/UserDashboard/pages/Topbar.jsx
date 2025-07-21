"use client"
import { Search, Plus, LayoutGrid, Bell, Slack, Menu, AlignJustify, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import ProfileDropdown from "../../ui/ProfileDropdown"
import NotificationDropdown from "../../ui/NotificationDropdown"

const Topbar = () => {
  const authUser = useSelector((state) => state.auth.authUser)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

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
        
        <div className="flex items-center space-x-2 flex-shrink-0">
                {/* Notifications */}
                <NotificationDropdown />
        
                <ProfileDropdown />
              </div>

      </div>
    </div>
  )
}

export default Topbar

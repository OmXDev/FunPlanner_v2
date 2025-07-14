"use client"

import {
  Circle,
  Inbox,
  FolderOpen,
  Eye,
  Home,
  Calendar,
  Users,
  ClipboardList,
  ShoppingCart,
  DollarSign,
  Settings,
  AlignJustify,
  X,
  PanelRight,
} from "lucide-react"
import { useRef } from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Sidebar = ({onToggle}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const sidebarRef = useRef(null)
  const timeoutRef = useRef(null)

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: true,
    },
    {
      label: "Inbox",
      icon: Inbox,
      href: "/chat-app",
      active: false,
    },
  ]

  const workspaceItems = [
    {
      label: "Calendar",
      icon: Calendar,
      href: "/calendar",
      active: false,
    },
    {
      label: "Tasks",
      icon: ClipboardList,
      href: "/todo",
      active: false,
    },
    {
      label: "Finances",
      icon: DollarSign,
      href: "/finances",
      active: false,
    },
  ]

  const teamItems = [
    { icon: Circle, label: "Issues", active: true },
    { icon: FolderOpen, label: "Tasks", active: false },
    { icon: Eye, label: "Views", active: false },
  ]

  const tryItems = [
    {
      label: "Vendors",
      icon: ShoppingCart,
      href: "/vendor-dashboard",
      active: false,
    },
    {
      label: "Clients",
      icon: Users,
      href: "/client-dashboard",
      active: false,
    },
  ]

  const handleMouseEnter = () => {
    if (!isSidebarOpen) {
      clearTimeout(timeoutRef.current)
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isSidebarOpen) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false)
      }, 300)
    }
  }

  const handleToggleClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setIsHovered(false)
  }

  useEffect(() => {
    onToggle?.(isSidebarOpen)
  }, [isSidebarOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest(".sidebar-container") && !event.target.closest(".sidebar-toggle")) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isSidebarOpen])

  return (
    <>
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-2.5 left-4 z-50 p-2 bg-[#161b22] border border-gray-700 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors "
        >
          <AlignJustify className="w-5 h-5" />
        </button>
      )}
      {/* Sidebar Toggle Button */}
      <div
        className={`hidden lg:block fixed top-14 z-40 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "left-64" : "left-3"
        }`}
      >
        <button
          onClick={handleToggleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="p-1 duration-200 cursor-pointer"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <PanelRight className="h-5 w-5" />
          <span className="sr-only">
            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </span>
        </button>
      </div>

      <div ref={sidebarRef}
        className={`fixed z-40 transition-all duration-300 ease-in-out ${isSidebarOpen
          ? "left-0 top-14 w-64 h-full"
          : isHovered
            ? "left-3 top-24 w-64 h-auto max-h-96"
            : "left-3 top-30 w-0 h-0 overflow-hidden"
          }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div
          className={`sidebar-container fixed lg:static inset-y-0 left-0  z-40 w-64 bg-[#161b22] border-r
             border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0
             ${isSidebarOpen ? "h-full rounded-none border-r" : "rounded-sm overflow-hidden"
            } ${isSidebarOpen || isHovered ? "opacity-100" : "opacity-0"}`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-black
               font-bold text-sm">
                IN
              </div>
              <span className="font-semibold text-white">InnovateX</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex flex-col min-h-screen">
            <div className="flex-1 overflow-y-auto py-4">
              {/* Main Navigation */}

              <div className={`${isSidebarOpen ? "p-4" : "p-2"}`}>
                <div className="flex items-center justify-between px-3 py-2 mb-2">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Main</span>
                </div>
                <div className="space-y-1">
                  {sidebarItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-800/80 ${item.active ? "bg-gray-800 text-white shadow-sm" : "text-gray-300 hover:text-white"
                        }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Workspace Section */}
              <div className={`${isSidebarOpen ? "p-4" : "p-2"}`}>
                <div className="flex items-center justify-between px-3 py-2 mb-2">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Workspace</span>
                </div>
                <div className="space-y-1">
                  {workspaceItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-800/80 hover:text-white"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Connections Section */}
              <div className={`${isSidebarOpen ? "p-4" : "p-2"}`}>
                <div className="flex items-center justify-between px-3 py-2 mb-2">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Connections</span>
                </div>
                <div className="space-y-1">
                  {tryItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-800/80 hover:text-white"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

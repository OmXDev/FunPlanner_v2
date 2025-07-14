"use client"

import { X, Menu } from 'lucide-react'
import Sidebar from "../pages/Sidebar"
import Topbar from "../pages/Topbar"
import Dashboard from "../pages/Dashboard"
import { useState } from "react";

const DashboardLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-white">
      {/* Topbar */}
      <div className="sticky top-0 z-40 bg-[#0d1117] border-b border-gray-800">
        <Topbar />
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden ">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <Sidebar onToggle={(visible) => setSidebarVisible(visible)} />
        </div>

        {/* Main Content */}
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${sidebarVisible ? "lg:ml-64 ml-0" : "ml-0"
            }`}
        >
          <Dashboard />
        </main>
      </div>
    </div>

  );
}

export default DashboardLayout;

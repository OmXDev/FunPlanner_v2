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
    Slack,
} from "lucide-react"
import { useCallback, useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Sidebar = ({ onToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const sidebarRef = useRef(null)
    const timeoutRef = useRef(null)

    const [isDesktopSidebarManuallyOpen, setIsDesktopSidebarManuallyOpen] = useState(false);

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
        // {
        //     label: "Finances",
        //     icon: DollarSign,
        //     href: "/finances",
        //     active: false,
        // },
    ]


    const connectionsItems = [
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

    const handleMouseEnter = useCallback(() => {
        if (window.innerWidth >= 1024 && !isDesktopSidebarManuallyOpen) {
            clearTimeout(timeoutRef.current);
            setIsHovered(true);
        }
    }, [isDesktopSidebarManuallyOpen]);

    const handleMouseLeave = useCallback(() => {
        if (window.innerWidth >= 1024 && !isDesktopSidebarManuallyOpen) {
            timeoutRef.current = setTimeout(() => {
                setIsHovered(false);
            }, 300);
        }
    }, [isDesktopSidebarManuallyOpen]);


    const handleDesktopToggleClick = useCallback(() => {
        const newState = !isSidebarOpen;
        setIsSidebarOpen(newState);
        setIsHovered(false);
        setIsDesktopSidebarManuallyOpen(newState);
    }, [isSidebarOpen]);

    const handleMobileOpenClick = useCallback(() => {
        setIsSidebarOpen(true);
        setIsDesktopSidebarManuallyOpen(false);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
        setIsHovered(false);
        setIsDesktopSidebarManuallyOpen(false);
    }, []);

    useEffect(() => {
        onToggle?.(isSidebarOpen);
    }, [isSidebarOpen, onToggle]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSidebarOpen) {
                if (
                    sidebarRef.current &&
                    !sidebarRef.current.contains(event.target) &&
                    !event.target.closest(".mobile-menu-button") &&
                    !event.target.closest(".sidebar-toggle-btn")
                ) {
                    if (window.innerWidth < 1024 || !isDesktopSidebarManuallyOpen) {
                        closeSidebar();
                    }
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen, isDesktopSidebarManuallyOpen, closeSidebar]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                if (isDesktopSidebarManuallyOpen) {
                    setIsSidebarOpen(true);
                } else {
                    setIsSidebarOpen(false);
                }
            } else {
                setIsSidebarOpen(false);
                setIsDesktopSidebarManuallyOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [isDesktopSidebarManuallyOpen]);

    return (
        <>
            {!isSidebarOpen && (
                <button
                    onClick={handleMobileOpenClick}
                    className={`lg:hidden fixed  left-4 top-2.5 z-50 p-2 bg-[#161b22] border border-gray-700 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors mobile-menu-button
                      `}
                    aria-label="Open sidebar menu"
                >
                    <AlignJustify className="w-5 h-5" />
                </button>
            )}

            <div
                className={`hidden lg:block fixed top-20 z-50 transition-all duration-300 ease-in-out
                   ${isSidebarOpen ? "left-56" : "left-3"} `}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    onClick={handleDesktopToggleClick}
                    className="p-1 duration-200 cursor-pointer text-gray-400 hover:text-white sidebar-toggle-btn"
                    aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    <PanelRight className="h-5 w-5" />
                    <span className="sr-only">
                        {isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                    </span>
                </button>
            </div>

            <div
                ref={sidebarRef}
                className={`
                    fixed top-0 h-screen z-40 bg-[#161b22] border-r border-gray-800
                    transition-all duration-300 ease-in-out
                    ${isSidebarOpen || isHovered ? "w-64" : "w-16"}
                    overflow-hidden
                    ${window.innerWidth < 1024 ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : ""}
                    ${window.innerWidth < 1024 ? "" : (isSidebarOpen || isHovered ? "block" : "block")}

                    top-0
                    lg:top-14
                `}
                onMouseEnter={window.innerWidth >= 1024 && !isDesktopSidebarManuallyOpen ? handleMouseEnter : undefined}
                onMouseLeave={window.innerWidth >= 1024 && !isDesktopSidebarManuallyOpen ? handleMouseLeave : undefined}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-800 lg:hidden">
                    <div className="flex items-center flex-shrink-0">
          <a href="/" className="flex items-center space-x-2 group">
            <Slack className="w-8 h-8 text-white" />
            <span className=" text-lg font-semibold tracking-wide hidden sm:inline-block">Fun Planner</span>
          </a>
        </div>
                    <button onClick={closeSidebar} className="text-gray-400 hover:text-white p-1 rounded" aria-label="Close sidebar">
                        <X className="w-5 h-5" />
                    </button>
                </div>


                <div className="flex flex-col min-h-screen">
                    <div className={`flex-1 overflow-y-auto
                        ${isSidebarOpen ? "duration-700 py-4" : " duration-700 py-12"}
                        ${isHovered ? "duration-700 py-12" : "duration-700 py-4"}
                    `}>
                        <div className={`${isSidebarOpen || isHovered ? "p-4" : "p-2"}`}>
                            <div className="flex items-center justify-between px-3 py-2 mb-2">
                                <span className={`text-xs text-gray-400 font-medium uppercase tracking-wider transition-opacity duration-300 ${isSidebarOpen || isHovered ? "opacity-100" : "opacity-0"}`}>Main</span>
                            </div>
                            <div className="space-y-1">
                                {sidebarItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.href}
                                        onClick={closeSidebar}
                                        className="relative group flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-800/80 hover:text-white"
                                    >
                                        <item.icon className="w-4 h-4 flex-shrink-0 text-gray-400 transition-colors duration-200 group-hover:text-white" />
                                        <span
                                            className={`truncate transition-all duration-300 ml-1
                                                ${isSidebarOpen || isHovered
                                                    ? "relative opacity-100 translate-x-0 pointer-events-auto"
                                                    : "absolute opacity-0 -translate-x-2 pointer-events-none"}
                                            `}
                                        >
                                            {item.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className={`${isSidebarOpen || isHovered ? "p-4" : "p-2"}`}>
                            <div className="flex items-center justify-between px-3 py-2 mb-2">
                                <span className={`text-xs text-gray-400 font-medium uppercase tracking-wider transition-opacity duration-300 ${isSidebarOpen || isHovered ? "opacity-100" : "opacity-0"}`}>Workspace</span>
                            </div>
                            <div className="space-y-1">
                                {workspaceItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.href}
                                        onClick={closeSidebar}
                                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-800/80 hover:text-white"
                                    >
                                        <item.icon className="w-4 h-4 flex-shrink-0 text-gray-400 transition-colors duration-200 group-hover:text-white" />
                                        <span
                                            className={`truncate transition-all duration-300 ml-1 ${isSidebarOpen || isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                                            `}
                                        >
                                            {item.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className={`${isSidebarOpen || isHovered ? "p-4" : "p-2"}`}>
                            <div className="flex items-center justify-between px-3 py-2 mb-2">
                                <span className={`text-xs text-gray-400 font-medium uppercase tracking-wider transition-opacity duration-300 ${isSidebarOpen || isHovered ? "opacity-100" : "opacity-0"}`}>Connections</span>
                            </div>
                            <div className="space-y-1">
                                {connectionsItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.href}
                                        onClick={closeSidebar}
                                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-800/80 hover:text-white"
                                    >
                                        <item.icon className="w-4 h-4 flex-shrink-0 text-gray-400 transition-colors duration-200 group-hover:text-white" />
                                        <span
                                            className={`truncate transition-all duration-300 ml-1 ${isSidebarOpen || isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                                            `}
                                        >
                                            {item.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 group cursor-pointer"
      >
        <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-[#1e232a] text-gray-200 shadow-xl rounded-md z-20 transition-all duration-200 transform translate-y-1 opacity-100">
          <div className="border-b border-gray-700 px-4 py-3 font-semibold text-sm">
            Notifications
          </div>
          <div className="px-4 py-6 text-sm text-gray-400 text-center">
            You have no notifications
          </div>
        </div>
      )}
    </div>
  );
}

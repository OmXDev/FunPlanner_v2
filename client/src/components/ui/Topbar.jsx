import { Bell, Slack, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";

const Topbar = () => {
  const authUser = useSelector((state) => state.auth.authUser);

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
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        {/* Notifications */}
        <NotificationDropdown />

        <ProfileDropdown/>
      </div>
    </div>
  );
};

export default Topbar;

import { Bell, Slack, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";

const Topbar = () => {
  const authUser = useSelector((state) => state.auth.authUser);

  return (
    <header className="h-14 border-b border-slate-700 bg-[#161b22] px-6 flex items-center justify-between text-white">
      {/* Left: Logo */}
      <div className="flex items-center flex-shrink-0">
          <a href="/" className="flex items-center space-x-2 group">
            <Slack className="w-8 h-8 text-white" />
            <span className=" text-lg font-semibold tracking-wide hidden sm:inline-block">Fun Planner</span>
          </a>
        </div>

      {/* Right: Notification & Profile */}
      <div className="flex items-center gap-5">
        <Bell className="w-5 h-5 text-slate-400 hover:text-white transition cursor-pointer" />

        {/* Profile Section */}
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
    </header>
  );
};

export default Topbar;

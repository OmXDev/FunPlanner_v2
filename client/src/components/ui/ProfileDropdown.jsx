import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from 'react-redux';


export default function ProfileDropdown() {
    const authUser = useSelector((state) => state.auth.authUser);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, null,
                {
                    withCredentials: true
                }
            )
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('authUser');
            navigate("/");
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {/* Avatar */}
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
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#161b22] shadow-md rounded-md py-2 z-10">
                    <Link
                        to="/settings"
                        className="flex items-center gap-3 px-5 py-3 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            )}

        </div>
    );
}

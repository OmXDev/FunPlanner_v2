"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chrome, Slack } from "lucide-react";
import axios from "axios";



const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // 👈 enables sending/receiving cookies
                }
            );

            const data = response.data;

            console.log('Login successful:', data);
            localStorage.setItem("token", data.accesstoken);
            localStorage.setItem('refreshToken', data.refreshtoken);

            navigate('/dashboard');

        } catch (error) {
            if (error.response) {
                console.error('Login failed:', error.response.data.message || error.response.data.msg);
            } else {
                console.error('Login error:', error.message);
            }
        }
    };

    const features = [
        {
            title: "Smart Scheduling & Reminders",
            desc: "Automate event scheduling, send timely reminders to guests, and avoid last-minute surprises.",
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10m-11 4h12m-5 4h5a2 2 0 002-2V7a2 2 0 00-2-2h-1"
                />
            ), // CalendarDays icon
        },
        {
            title: "Vendor & Guest Management",
            desc: "Track RSVPs, assign tasks, and manage guest lists in one central dashboard.",
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m1-4a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8z"
                />
            ), // Users icon
        },
        {
            title: "Real-Time Collaboration Tools",
            desc: "Work with your team in real-time. Share notes, chat, and update progress easily.",
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
            ), // MessageSquare icon
        },
    ];


    const googleloginHandler = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
    }
    return (
        <div className="min-h-screen bg-[#0b0b0f] text-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-black border-b border-gray-800 px-4 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="/" className="flex items-center space-x-2">
                        <Slack className="w-8 h-8 " />
                        <span className="text-white font-semibold font-sans text-xl tracking-wide">Fun Planner</span>
                    </a>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm hidden md:block">Don’t have an account?</span>
                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row flex-1">
                <div className="px-6 py-10 lg:px-16 flex-1 lg:flex-col lg:flex">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 sm:mb-10 leading-tight text-center lg:text-left">
                        Plan, Organize & Host<br className="hidden sm:block" /> Unforgettable Events
                    </h1>

                    <div className="space-y-8 mt-8">
                        {features.map(({ title, desc, icon }, idx) => (
                            <div key={idx} className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {icon}
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                                    <p className="text-gray-400 text-sm sm:text-base">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Login Form */}
                <div className="w-full lg:w-1/2 bg-[#1a1b1e] px-6 sm:px-10 py-10 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">Welcome back</h2>

                        {/* Social Login */}
                        <button
                            onClick={googleloginHandler}
                            className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-100 transition duration-200 ease-in-out shadow-sm hover:shadow-md mb-6"
                        >
                             <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                            <span>Continue with Google</span>
                        </button>

                        {/* Divider */}
                        <div className="flex items-center mb-6">
                            <div className="flex-1 border-t border-gray-700 opacity-60" />
                            <span className="px-4 text-gray-500 text-xs uppercase tracking-wider">or</span>
                            <div className="flex-1 border-t border-gray-700 opacity-60" />
                        </div>

                        {/* Email/Password Form */}
                        <form onSubmit={loginHandler} className="space-y-5"> {/* Increased space-y */}
                            <div>
                                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-[#2b2c30] text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-[#2b2c30] text-white border border-gray-700 rounded-lg pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm">
                                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">Forgot Password?</a>
                                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">Use OTP</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-200 ease-in-out mt-4 shadow-md hover:shadow-lg"
                            >
                                Log In
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-8">
                            By continuing, you agree to our{" "}
                            <a href="#" className="text-purple-500 hover:text-purple-600">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Login;

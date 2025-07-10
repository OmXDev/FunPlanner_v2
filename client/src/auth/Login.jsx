"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slack } from "lucide-react";
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

            localStorage.setItem("authUser", JSON.stringify(res.data.user));
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


    const googleloginHandler = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
    }
    return (
        <div className="min-h-screen bg-[#0b0b0f] text-gray-100">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
                <div className="flex items-center px-20 space-x-2">
                    <Slack className="w-8 h-8 text-white" />
                    <span className="text-white font-medium font-sans text-lg">Fun Planner</span>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="text-gray-400">Don’t have an account?</span>
                    <button
                        onClick={() => { navigate('/signup') }}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition cursor-pointer">
                        Sign up
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-80px)]">
                {/* Features Section */}
                <div className="flex-1 px-10 py-16 lg:px-16 max-w-3xl">
                    <h1 className="text-4xl font-bold text-white mb-12 leading-tight">
                        Plan, Organize & Host<br /> Unforgettable Events
                    </h1>

                    <div className="space-y-10">
                        {[
                            {
                                title: "Smart Scheduling & Reminders",
                                desc: "Automate event scheduling, send timely reminders to guests, and avoid last-minute surprises with our intuitive calendar system.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10m-11 4h12m-5 4h5a2 2 0 002-2V7a2 2 0 00-2-2h-1"
                                    />
                                ),
                            },
                            {
                                title: "Vendor & Guest Management",
                                desc: "Easily track RSVPs, assign tasks to vendors, and manage guest lists in one central dashboard to ensure smooth coordination.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m1-4a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8z"
                                    />
                                ),
                            },
                            {
                                title: "Real-Time Collaboration Tools",
                                desc: "Work with your team, clients, or co-hosts in real-time. Share notes, chat, and update event progress without switching platforms.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                ),
                            },
                        ].map(({ title, desc, icon }, idx) => (
                            <div key={idx} className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {icon}
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Login Form */}
                <div className="w-full lg:w-1/2 bg-[#1a1b1e] px-8 py-14 flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full">
                        <h2 className="text-2xl font-semibold text-white mb-6">Welcome back</h2>

                        {/* Social Buttons */}
                        <div className="space-y-3 mb-6">

                            <button
                                onClick={googleloginHandler}
                                className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
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
                        </div>

                        <div className="flex items-center mb-6">
                            <div className="flex-1 border-t border-gray-700" />
                            <span className="px-4 text-gray-500 text-sm">or</span>
                            <div className="flex-1 border-t border-gray-700" />
                        </div>

                        {/* Email/Password Fields */}
                        <form className="space-y-4" onSubmit={loginHandler} method="POST">
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#2b2c30] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#2b2c30] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm text-gray-400">
                                <a href="#" className="hover:text-purple-500">
                                    Forgot Password?
                                </a>
                                <a href="#" className="hover:text-purple-500">
                                    Use OTP
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition mt-2"
                            >
                                Log In
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            By continuing, you agree to our{" "}
                            <a href="#" className="text-purple-500 hover:text-purple-600">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

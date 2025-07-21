// src/App.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { checkAuth } from './redux/slices/authSlice';
import { Loader } from 'lucide-react';


import HomeLayout from './layouts/HomeLayout';
import DashboardLayout from './components/UserDashboard/layout/DashboardLayout';
import ClientDashboard from './components/UserDashboard/dashboard/Client-dashboard';
import VendorsDashboard from './components/UserDashboard/dashboard/Vendor-dashboard';
import ClientProfile from './components/UserDashboard/profiles/Client-profile';
import EventProfile from './components/UserDashboard/profiles/Event-profile';
import EventDashboard from './components/UserDashboard/dashboard/Event-dashboard';
import VendorProfile from './components/UserDashboard/profiles/Vendor-profile';
import ChatAppLayout from './chat/layout/ChatAppLayout';
import TodoLayout from './components/Todo/layout/TodoLayout';
import ProtectedRoute from './lib/ProtectedRoute';
import Signup from './auth/Signup';
import Login from './auth/Login';
import AuthSuccess from './lib/auth-success';
import CalendarPage  from './components/calendar/layout/CalendarPage';

function App() {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  const isAuthenticated = !!authUser;

  
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <Loader className="size-10 animate-spin text-purple-500" />
        <span className="sr-only">Loading authentication status...</span>
      </div>
    );
  }

  const browserRouter = createBrowserRouter([
    { path: '/', element: <HomeLayout /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: "/auth-success", element: <AuthSuccess /> },


    {
      element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
      children: [
        { path: '/dashboard', element: <DashboardLayout /> },
        { path: '/client-dashboard', element: <ClientDashboard /> },
        { path: '/vendor-dashboard', element: <VendorsDashboard /> },
        { path: '/event-dashboard', element: <EventDashboard /> },
        { path: '/calendar', element: <CalendarPage/> },
        { path: '/chat-app', element: <ChatAppLayout /> },
        { path: '/todo', element: <TodoLayout /> },
        { path: '/client-profile/:id', element: <ClientProfile /> },
        { path: '/event-profile/:id', element: <EventProfile /> },
        { path: '/vendor-profile/:id', element: <VendorProfile /> },
      ],
    },

    // Fallback route for 404 - can be public or protected depending on your app design
    { path: '*', element: <div className="text-center p-10 text-white bg-slate-800 h-screen">404 - Page Not Found</div> },
  ]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
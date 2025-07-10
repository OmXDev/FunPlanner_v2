// src/App.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { checkAuth } from './redux/slices/authSlice';
import { Loader } from 'lucide-react';

// Routes
import Login from './auth/Login';
import Signup from './auth/Signup';
import HomeLayout from './layouts/HomeLayout';
import DashboardLayout from './components/UserDashboard/layout/DashboardLayout';
import ClientDashboard from './components/UserDashboard/dashboard/Client-dashboard';
import VendorsDashboard from './components/UserDashboard/dashboard/Vendor-dashboard';
import ClientProfile from './components/UserDashboard/profiles/Client-profile';
import EventProfile from './components/UserDashboard/profiles/Event-profile';
import EventDashboard from './components/UserDashboard/dashboard/Event-dashboard';
import VendorProfile from './components/UserDashboard/profiles/Vendor-profile';
import ChatAppLayout from './chat/layout/ChatAppLayout';
import TodoLayout from './layouts/TodoLayout';

// Protected Route Wrapper
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  // const { isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  // if (isCheckingAuth) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   );
  // }

  const browserRouter = createBrowserRouter([
    { path: '/', element: <HomeLayout /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },

    {
      path: '/dashboard',
      element: (
          <DashboardLayout />
        
      ),
    },
    {
      path: '/client-dashboard',
      element: (
          <ClientDashboard />
      ),
    },
    {
      path: '/vendor-dashboard',
      element: (
          <VendorsDashboard />
      ),
    },
    {
      path: '/event-dashboard',
      element: (
          <EventDashboard />
      ),
    },
    {
      path: '/chat-app',
      element: (
          <ChatAppLayout />
      ),
    },
    {
      path: '/todo',
      element: (
          <TodoLayout />
      ),
    },

    // These are public or semi-protected, depending on your auth logic
    { path: '/client-profile/:id', element: <ClientProfile /> },
    { path: '/event-profile/:id', element: <EventProfile /> },
    { path: '/vendor-profile/:id', element: <VendorProfile /> },

    // Fallback route for 404
    { path: '*', element: <div className="text-center p-10">404 - Page Not Found</div> },
  ]);

  return <RouterProvider router={browserRouter} />;
}

export default App;

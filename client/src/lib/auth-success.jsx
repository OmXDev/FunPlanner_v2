import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../redux/slices/authSlice";

import { useLocation } from 'react-router-dom';

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }

    dispatch(checkAuth()).unwrap()
      .then(() => navigate('/dashboard'))
      .catch((err) => {
        console.error("Auth check failed after Google login:", err);
        navigate('/login');
      });
  }, []);

};

export default AuthSuccess;

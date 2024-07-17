import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }
  if (user) {
    return children;
  }
   return null;
}

export default PrivateRoute;

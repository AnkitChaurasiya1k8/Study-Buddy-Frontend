import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; 

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;

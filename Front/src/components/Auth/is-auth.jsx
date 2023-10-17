import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
  return localStorage.getItem("token") != null ? (
    <>{children}</>
  ) : (
    <Navigate to="/error" replace />
  );
};

export default IsAuth;

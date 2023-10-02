import { Navigate } from "react-router-dom";

export const IsAuth = ({ children }) => {
  return localStorage.getItem("token") != null ? (
    <>{children}</>
  ) : (
    <Navigate to="/error" replace />
  );
};

export const IsNotAuth = ({ children }) => {
  return localStorage.getItem("token") == null ? (
    <>{children}</>
  ) : (
    <Navigate to="/error" />
  );
};

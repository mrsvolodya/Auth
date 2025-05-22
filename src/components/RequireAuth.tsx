import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContent";
import { Loader } from "./Loader";

export function RequireAuth({ children }: { children?: React.ReactNode }) {
  const { isChecked, currentUser } = useAuth();
  const location = useLocation();

  if (!isChecked) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
}

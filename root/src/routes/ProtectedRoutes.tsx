import { Navigate, useLocation } from "react-router-dom";
import { useCheckAuthFromCookie } from "../hooks/useCheckAuthFromCookie";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useCheckAuthFromCookie();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

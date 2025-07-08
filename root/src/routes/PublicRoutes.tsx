import { Navigate } from "react-router-dom";
import { useCheckAuthFromCookie } from "../hooks/useCheckAuthFromCookie";

interface Props {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const isAuthenticated = useCheckAuthFromCookie();

  if (isAuthenticated) {
    return <Navigate to="/customers" replace />;
  }

  return <>{children}</>;
}

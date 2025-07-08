import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy } from "react";
import { RootLayout } from "../layout";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";

const Welcome = lazy(() => import("welcome/Welcome"));
const CustomersPage = lazy(() => import("customers/CustomersPage"));
const SelectedCustomersPage = lazy(
  () => import("customers/SelectedCustomersPage")
);

export function AppRoutes() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/customers");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Welcome onLogin={handleLoginSuccess} />
          </PublicRoute>
        }
      />
      <Route element={<RootLayout />}>
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/selected-customers"
          element={
            <ProtectedRoute>
              <SelectedCustomersPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { useUserNameFromCookie } from "./hooks/useUserNameFromCookie";
import { useLogout } from "./hooks/useLogout";

const Header = lazy(() => import("designSystem/Header"));
const Loading = lazy(() => import("designSystem/Loading"));

const navItems: { path: string; label: string }[] = [
  { path: "/customers", label: "Clientes" },
  { path: "/selected-customers", label: "Clientes Selecionados" },
];

export function RootLayout() {
  const userName = useUserNameFromCookie();
  const logout = useLogout();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Suspense
        fallback={
          <div>
            <Loading size={30} />
          </div>
        }
      >
        <Header
          userName={userName ?? "Usuário"}
          navItems={navItems}
          onExit={logout}
        />
      </Suspense>

      <main
        style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          paddingBottom: "50px",
        }}
      >
        <div style={{ width: "80%", maxWidth: "1200px" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

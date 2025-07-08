import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      federation({
        name: "customers",
        filename: "remoteEntry.js",
        exposes: {
          "./CustomersPage": "./src/pages/customers/CustomersPage.tsx",
          "./SelectedCustomersPage":
            "./src/pages/selected-customers/SelectedCustomersPage.tsx",
          "./UseSelectedCustomersStore":
            "./src/stores/useSelectedCustomersStore.ts",
        },
        remotes: {
          designSystem: `${
            process.env.VITE_DESIGN_SYSTEM_MFE_URL || "http://localhost:3002"
          }/assets/remoteEntry.js`,
        },
        shared: [
          "react",
          "react-dom",
          "react-hook-form",
          "@tanstack/react-query",
        ],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  });
};

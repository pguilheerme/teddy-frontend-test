import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      federation({
        name: "root",
        filename: "remoteEntry.js",
        remotes: {
          customers: `${
            process.env.VITE_CUSTOMERS_MFE_URL || "http://localhost:3001"
          }/assets/remoteEntry.js`,
          designSystem: `${
            process.env.VITE_DESIGN_SYSTEM_MFE_URL || "http://localhost:3002"
          }/assets/remoteEntry.js`,
          welcome: `${
            process.env.VITE_WELCOME_MFE_URL || "http://localhost:3003"
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
      target: "esnext",
    },
  });
};

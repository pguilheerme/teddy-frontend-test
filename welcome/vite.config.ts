import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [
      react(),
      federation({
        name: "welcome",
        filename: "remoteEntry.js",
        exposes: {
          "./Welcome": "./src/pages/welcome/Welcome.tsx",
          "./UseUserStore": "./src/stores/useUserStore.ts",
        },
        remotes: {
          designSystem: `${
            env.VITE_DESIGN_SYSTEM_MFE_URL || "http://localhost:3002"
          }/assets/remoteEntry.js`,
        },
        shared: ["react", "react-dom", "react-hook-form"],
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

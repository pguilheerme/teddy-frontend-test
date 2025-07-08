import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "designSystem",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button/Button.tsx",
        "./TextInput": "./src/components/TextInput/TextInput.tsx",
        "./PageContainer": "./src/components/PageContainer/PageContainer.tsx",
        "./BaseModal": "./src/components/Modals/BaseModal.tsx",
        "./Pagination": "./src/components/Pagination/Pagination.tsx",
        "./Header": "./src/components/Header/Header.tsx",
        "./LogoTeddy": "./src/brand/LogoTeddy.svg",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});

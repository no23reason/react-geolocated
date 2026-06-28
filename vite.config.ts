import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Builds the docs demo (demo/index.html). Served at the repo subpath on
// GitHub Pages, at the root locally.
export default defineConfig(({ command }) => ({
    root: "demo",
    base: command === "build" ? "/react-geolocated/" : "/",
    plugins: [react()],
    build: {
        outDir: "dist",
        emptyOutDir: true,
    },
}));

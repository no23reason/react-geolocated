import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        include: ["tests/**/*.{test,spec}.{ts,tsx}"],
        coverage: {
            provider: "v8",
            include: ["src/**"],
        },
    },
});

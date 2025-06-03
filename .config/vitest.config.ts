import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        include: ["tests/**/*.test.{js,ts,tsx}", "src/**/*.test.{js,ts,tsx}"],
        onConsoleLog(log, type) {
            return true; // explicitly allow all logs
        },
        setupFiles: './.config/vitest.setup.ts',
        coverage: {
            reporter: ["text", "html"], // terminal + HTML rapport
            exclude: [
                // Test files
                "**/tests/**",
                "**/__tests__/**",
                // Build outputs
                "**/dist/**",
                "**/dist-no-scope/**",
                // Config files
                "**/.config/**",
                "**/vite-env.d.ts",
                "**/vitest.config.ts",
                // Other non-source files
                "**/node_modules/**",
                "**/public/**",
                "**/base/**"
            ],
            include: [
                "src/**/*.{js,jsx,ts,tsx}"
            ]
        },
    },
});
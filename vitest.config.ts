import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./__tests__/setup.ts"],
        alias: {
            "@": path.resolve(__dirname, "./"),
        },
        // Spread the defaults rather than replacing them: the old list dropped
        // vitest's own excludes, so agent worktrees under .claude/ were collected
        // as a second copy of this entire suite — every file reported twice, and
        // their Playwright specs failed on import because they aren't vitest tests.
        exclude: [...configDefaults.exclude, "e2e/**/*", ".claude/**"],
    },
});

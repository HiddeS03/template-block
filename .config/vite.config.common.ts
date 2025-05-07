import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import { parse } from "yaml";
import { readFileSync } from "fs";
import { join } from "path";
import pkg from "../package.json";

const manifestPath = join(__dirname, "../public/manifest.yaml");
const manifest = parse(readFileSync(manifestPath, "utf8"));

export const getBaseConfig = (options: {
  name: string;
  outDir?: string;
  shareScope?: string;
}): UserConfig => ({
  build: {
    target: "es2022",
    modulePreload: false,
    outDir: options.outDir,
    rollupOptions: {
      input: {},
    },
  },
  server: {
    port: 5174,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    react(),
    federation({
      name: options.name,
      filename: "remoteEntry.js",
      exposes: {
        "./AppInjector": "./src/.base/AppInjector.tsx",
        ...(options.shareScope === "none" ? {} : { "./Block": "./src/Block.tsx" }),
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: pkg.dependencies.react,
          ...(options.shareScope && { shareScope: options.shareScope }),
        },
        "react-dom": {
          singleton: true,
          requiredVersion: pkg.dependencies["react-dom"],
          ...(options.shareScope && { shareScope: options.shareScope }),
        },
      },
    }),
  ],
});

export { manifest };
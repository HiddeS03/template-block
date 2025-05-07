import { defineConfig } from "vite";
import { getBaseConfig, manifest } from "./vite.config.common";

export default defineConfig(
  getBaseConfig({
    name: manifest.id + "-no-scope",
    outDir: "dist-no-scope",
    shareScope: "none",
  })
);

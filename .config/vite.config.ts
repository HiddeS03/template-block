import { defineConfig } from "vite";
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { v4 as Guid } from "uuid";
import { getBaseConfig, manifest } from "./vite.config.common";

// Check if `id` exists; if not, generate and persist it
if (!manifest.id) {
  manifest.id = `${Guid()}`;
  const manifestPath = join(__dirname, "../public/manifest.yaml");
   const manifestContent = readFileSync(manifestPath, "utf8");
  const newYaml = `id: ${manifest.id}\n`; // minimal re-serialization
  writeFileSync(manifestPath, newYaml + manifestContent, "utf8"); // prepend id
}

export default defineConfig(getBaseConfig({ name: manifest.id }));

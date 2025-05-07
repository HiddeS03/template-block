import { defineConfig } from "vite";
import { writeFileSync } from "fs";
import { join } from "path";
import { v4 as Guid } from "uuid";
import { getBaseConfig, manifest } from "./vite.config.common";

// Check if `id` exists; if not, generate and persist it
if (!manifest.id) {
  manifest.id = `${Guid()}`;
  const manifestPath = join(__dirname, "../public/manifest.yaml");
  // Optional: Write back to the manifest file
  const newYaml = `id: ${manifest.id}\n`; // minimal re-serialization
  writeFileSync(manifestPath, newYaml + manifestContent, "utf8"); // prepend id
}

export default defineConfig(getBaseConfig({ name: manifest.id }));

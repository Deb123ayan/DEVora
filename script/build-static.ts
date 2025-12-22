import { build as viteBuild } from "vite";
import { rm } from "fs/promises";
import path from "path";
import { loadConfigFromFile } from "vite";

async function buildStatic() {
  const distPath = path.resolve(process.cwd(), "dist");

  await rm(distPath, { recursive: true, force: true });

  console.log("building optimized static client...");

  // Load the existing vite config
  const configFile = await loadConfigFromFile(
    { command: "build", mode: "production" },
    path.resolve(process.cwd(), "vite.config.ts")
  );

  if (!configFile) {
    throw new Error("Could not load vite config");
  }

  // Override the build output directory with minimal optimizations
  const config = {
    ...configFile.config,
    build: {
      ...configFile.config.build,
      outDir: distPath,
      emptyOutDir: true,
      // Simplified code splitting for better performance
      rollupOptions: {
        output: {
          manualChunks: {
            // Only essential chunks
            vendor: ["react", "react-dom", "framer-motion"],
            three: ["three", "postprocessing"], // Only for LightPillar
          },
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
      // Enable compression and minification
      minify: "esbuild" as const,
      // Optimize chunk size
      chunkSizeWarningLimit: 300,
      // Disable source maps for smaller files
      sourcemap: false,
    },
  };

  await viteBuild(config);

  console.log(
    "✅ Optimized static build complete! Files are in the 'dist' directory."
  );
  console.log(
    "🚀 You can now serve the static files using any static hosting service."
  );
  console.log("📁 To test locally, run: npx serve dist");
  console.log(
    "📦 Website is now fully optimized for low bandwidth connections!"
  );
}

buildStatic().catch((err) => {
  console.error(err);
  process.exit(1);
});

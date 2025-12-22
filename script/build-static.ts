import { build as viteBuild } from "vite";
import { rm } from "fs/promises";
import path from "path";
import { loadConfigFromFile } from "vite";

async function buildStatic() {
  const distPath = path.resolve(process.cwd(), "dist");
  
  await rm(distPath, { recursive: true, force: true });

  console.log("building static client...");
  
  // Load the existing vite config
  const configFile = await loadConfigFromFile(
    { command: "build", mode: "production" },
    path.resolve(process.cwd(), "vite.config.ts")
  );
  
  if (!configFile) {
    throw new Error("Could not load vite config");
  }
  
  // Override the build output directory with optimizations
  const config = {
    ...configFile.config,
    build: {
      ...configFile.config.build,
      outDir: distPath,
      emptyOutDir: true,
      // Enable code splitting and optimization
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor libraries
            'vendor-react': ['react', 'react-dom'],
            'vendor-three': ['three', 'postprocessing'],
            'vendor-motion': ['framer-motion'],
            'vendor-ui': ['@radix-ui/react-tooltip', '@radix-ui/react-toast'],
          },
          // Optimize chunk file names
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      },
      // Enable compression and minification
      minify: 'esbuild', // Use esbuild instead of terser for faster builds
      // Optimize chunk size
      chunkSizeWarningLimit: 500,
      // Enable source map for debugging (optional)
      sourcemap: false
    },
  };
  
  await viteBuild(config);

  console.log("✅ Static build complete! Files are in the 'dist' directory.");
  console.log("🚀 You can now serve the static files using any static hosting service.");
  console.log("📁 To test locally, run: npx serve dist");
}

buildStatic().catch((err) => {
  console.error(err);
  process.exit(1);
});
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa"; // Import the plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update service worker
      injectRegister: "auto", // Inject register script automatically

      // --- Web App Manifest Configuration ---
      manifest: {
        name: "Camper Tracker App", // Full app name
        short_name: "Camper", // Short name for home screen
        description: "Effortlessly track camper entries.",
        theme_color: "#E5989B", // Match your app's theme
        background_color: "#FFF2EB", // Match your app's background
        display: "standalone", // Open like a native app
        icons: [
          // IMPORTANT: Place these icon files in your `public` folder
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-maskable-192x192.png", // For Android adaptive icons
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      // --- Service Worker (Workbox) Configuration (optional for basic setup) ---
      // You can add more complex caching strategies here if needed for offline API calls
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}",
        ],
        // Example of caching API calls (uncomment and adjust URL if needed)
        // runtimeCaching: [
        //   {
        //     urlPattern: ({ url }) => url.origin === 'https://campertracker.onrender.com', // Your backend URL
        //     handler: 'NetworkFirst', // Or CacheFirst, StaleWhileRevalidate
        //     options: {
        //       cacheName: 'api-data-cache',
        //       expiration: {
        //         maxEntries: 10,
        //         maxAgeSeconds: 60 * 60 * 24, // 24 Hours
        //       },
        //     },
        //   },
        // ],
      },
    }),
  ],
});

/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// Function to apply dark mode based on user's system preference
function applyDarkMode() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark"); // Add dark mode class to html element
  } else {
    document.documentElement.classList.remove("dark"); // Remove dark mode class if system prefers light
  }
}

// Ensure dark mode is applied on the initial page load
if (typeof window !== "undefined") {
  applyDarkMode();
  // Listen for changes in system theme preference (optional)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', applyDarkMode);
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});

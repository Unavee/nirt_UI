"use client";

import { useEffect } from "react";

export default function PWARegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("NIRT Solar PWA ServiceWorker active: ", registration.scope);
          })
          .catch((err) => {
            console.log("ServiceWorker registration skipped: ", err);
          });
      });
    }
  }, []);

  return null;
}

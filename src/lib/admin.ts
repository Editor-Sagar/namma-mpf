// Lightweight client-side admin gate. NOT a security boundary, just a UI flag.
// Replace with real auth when backend is wired.
const KEY = "namma-mpf-admin";
const SECRET = "MPF";

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "1";
}

export function tryUnlockAdmin(input: string): boolean {
  if (input.trim().toUpperCase() === SECRET) {
    window.localStorage.setItem(KEY, "1");
    window.dispatchEvent(new Event("namma-mpf-admin-change"));
    return true;
  }
  return false;
}

export function lockAdmin() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("namma-mpf-admin-change"));
}

import { useEffect, useState } from "react";

export function useIsAdmin() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const sync = () => setAdmin(isAdmin());
    sync();
    window.addEventListener("namma-mpf-admin-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("namma-mpf-admin-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return admin;
}

import { effect, signal } from "@preact/signals";

export const isDarkMode = signal(
  (typeof localStorage !== undefined && localStorage.theme === "dark") ||
    (!("theme" in localStorage) &&
      typeof window.matchMedia !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches),
);

effect(() => {
  if (typeof document !== "undefined") {
    if (isDarkMode.value) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }
});

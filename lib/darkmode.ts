import { effect, signal } from "@preact/signals";

export const isDarkMode = signal(false);

effect(() => {
  if (typeof document !== "undefined") {
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
});

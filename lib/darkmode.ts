import { IS_BROWSER } from "$fresh/runtime.ts";
import { effect, signal } from "@preact/signals";

export const isDarkMode = signal(false);

effect(() => {
  if (IS_BROWSER) {
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
});

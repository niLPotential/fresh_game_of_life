import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      disabled={!IS_BROWSER || props.disabled}
      class="text-sm sm:text-base px-2 py-1 border(white 2) bg-gray-300 hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-800"
    />
  );
}

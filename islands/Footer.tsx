import { isDarkMode } from "../lib/darkmode.ts";
import IconSunMoon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/sun-moon.tsx";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-github.tsx";

export default function DarkMode() {
  const handleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  return (
    <div className="flex my-5 justify-evenly sm:justify-around">
      <IconSunMoon onClick={handleDarkMode} />
      <a
        className="relative w-2/3 sm:w-1/2"
        href="https://fresh.deno.dev"
      >
        <img
          className="absolute inset-0 m-auto transition-opacity opacity-0 dark:opacity-100"
          width="197"
          height="37"
          src="https://fresh.deno.dev/fresh-badge-dark.svg"
          alt="Made with Fresh"
        />
        <img
          className="absolute inset-0 m-auto transition-opacity dark:opacity-0"
          width="197"
          height="37"
          src="https://fresh.deno.dev/fresh-badge.svg"
          alt="Made with Fresh"
        />
      </a>
      <a
        href="https://github.com/niLPotential/fresh_game_of_life"
        target="_blank"
      >
        <IconBrandGithub />
      </a>
    </div>
  );
}

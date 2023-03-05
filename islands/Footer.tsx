import { useEffect, useState } from "preact/hooks";
import IconSunMoon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/sun-moon.tsx";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-github.tsx";

export default function DarkMode() {
  const [isDarkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex my-5">
      <IconSunMoon onClick={handleDarkMode} />
      <a className="relative w-full" href="https://fresh.deno.dev">
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

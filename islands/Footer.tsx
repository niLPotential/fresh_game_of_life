import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import IconSunMoon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/sun-moon.tsx";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-github.tsx";

export default function Footer() {
  const [isDark, setDark] = useState(
    IS_BROWSER
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : true,
  );

  useEffect(() => {
    isDark
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  });

  const handleDarkMode = () => {
    setDark((prevState) => !prevState);
  };

  return (
    <div className="flex justify-evenly sm:justify-around items-center">
      <IconSunMoon onClick={handleDarkMode} />
      <a href="https://fresh.deno.dev">
        <img
          className="hidden dark:inline"
          width="197"
          height="37"
          src="https://fresh.deno.dev/fresh-badge-dark.svg"
          alt="Made with Fresh"
        />
        <img
          className="dark:hidden"
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

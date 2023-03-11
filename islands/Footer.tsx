import { Head } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import IconSunMoon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/sun-moon.tsx";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-github.tsx";

export default function Footer() {
  // inject script in 'head' to avoid FOUC
  const script = `switch (localStorage.theme) {
    case 'dark':
      document.documentElement.classList.add('dark');
      break;
    case 'light':
      document.documentElement.classList.remove('dark');
      break;
    default:
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark');
      break;
  }`;

  const [isDark, setDark] = useState(
    IS_BROWSER
      ? localStorage.theme === "dark"
        ? true
        : localStorage.theme === "light"
        ? false
        : window.matchMedia("(prefers-color-scheme: dark)").matches
      : false,
  );

  useEffect(() => {
    if (isDark) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleDarkMode = () => {
    setDark((prevState) => !prevState);
  };

  return (
    <div className="flex justify-evenly sm:justify-around items-center">
      <Head>
        <script>{script}</script>
      </Head>
      <IconSunMoon onClick={handleDarkMode} />
      <a href="https://fresh.deno.dev" target="_blank">
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

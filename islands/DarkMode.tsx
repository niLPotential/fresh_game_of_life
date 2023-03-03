import { useEffect, useState } from "preact/hooks";
import IconSunMoon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/sun-moon.tsx";

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

  return <IconSunMoon onClick={handleDarkMode} />;
}

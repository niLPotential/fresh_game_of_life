import { Head } from "$fresh/runtime.ts";
import GameOfLife from "../islands/GameOfLife.tsx";
import DarkMode from "../islands/DarkMode.tsx";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-github.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh Game of Life</title>
      </Head>
      <div className="h-screen flex flex-col justify-center items-center font-mono bg-gray-200 dark:bg-gray-700 dark:text-white">
        <div className="mb-2 sm:mb-3 flex flex-col items-center">
          <a
            className="text-2xl sm:text-3xl hover:text-blue-500"
            href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
            target="_blank"
          >
            Conway's Game of Life
          </a>
          <br />
          <a
            className="sm:text-xl hover:text-blue-500"
            href="https://www.freecodecamp.org/news/coding-the-game-of-life-with-react-7de2385b7356/"
            target="_blank"
          >
            Based on this freeCodeCamp article
          </a>
        </div>

        <div>
          <GameOfLife />

          <div className="flex justify-around items-center">
            <DarkMode />
            <a href="https://fresh.deno.dev" target="_blank">
              <img
                width="197"
                height="37"
                src="https://fresh.deno.dev/fresh-badge-dark.svg"
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
        </div>
      </div>
    </>
  );
}

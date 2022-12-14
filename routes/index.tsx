import { Head } from "$fresh/runtime.ts";
import GameOfLife from "../islands/GameOfLife.tsx";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fresh Game of Life</title>
      </Head>
      <main className="flex flex-col h-screen items-center bg-gray-800 text-white">
        <a
          href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
          target="_blank"
        >
          Conway's Game of Life
        </a>

        <GameOfLife />

        <a
          href="https://www.freecodecamp.org/news/coding-the-game-of-life-with-react-7de2385b7356/"
          target="_blank"
          className="hover:text-blue-500"
        >
          Based on this freeCodeCamp article
        </a>

        <div className="flex">
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
            <img src="/GitHub-Mark-Light-32px.png" alt="GitHub" />
          </a>
        </div>
      </main>
    </div>
  );
}

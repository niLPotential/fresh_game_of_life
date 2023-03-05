import { Head } from "$fresh/runtime.ts";
import GameOfLife from "../islands/GameOfLife.tsx";
import Footer from "../islands/Footer.tsx";

export default function Page() {
  return (
    <>
      <Head>
        <title>Fresh Game of Life</title>
      </Head>
      <div className="transition-colors h-screen flex flex-col justify-center items-center font-mono bg-gray-200 dark:bg-gray-700 dark:text-white">
        <div className="mb-2 sm:mb-3 flex flex-col items-center">
          <div>
            <a
              className="text-2xl sm:text-3xl hover:text-blue-500"
              href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
              target="_blank"
            >
              Conway's Game of Life
            </a>
          </div>
          <div>
            <a
              className="sm:text-xl hover:text-blue-500"
              href="https://www.freecodecamp.org/news/coding-the-game-of-life-with-react-7de2385b7356/"
              target="_blank"
            >
              Based on this freeCodeCamp article
            </a>
          </div>
        </div>

        <div>
          <GameOfLife />

          <Footer />
        </div>
      </div>
    </>
  );
}

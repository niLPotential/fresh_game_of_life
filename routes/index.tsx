import { Head } from "$fresh/runtime.ts";
import Footer from "../islands/Footer.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh Game Projects</title>
      </Head>
      <body className="bg-gray-200 dark:bg-gray-700 dark:text-white">
        <ul>
          <li>
            <a href="game-of-life">Game of Life</a>
          </li>
          <li>
            <a href="breakout">Breakout</a>
          </li>
          <li>
            <a href="2048">2048</a>
          </li>
          <li>
            <a href="snake-game">Snake Game</a>
          </li>
        </ul>
        <Footer />
      </body>
    </>
  );
}

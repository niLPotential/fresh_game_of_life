import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh Game Projects</title>
      </Head>
      <ul>
        <li>
          <a href="game-of-life">Game of Life</a>
        </li>
        <li>
          <a href="snake-game">Snake Game</a>
        </li>
      </ul>
    </>
  );
}

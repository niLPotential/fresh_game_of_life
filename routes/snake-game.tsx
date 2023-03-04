import { Head } from "$fresh/runtime.ts";
import SnakeGame from "../islands/SnakeGame.tsx";

export default function Page() {
  return (
    <>
      <Head>
        <title>Fresh Snake Game</title>
      </Head>
      <SnakeGame />
    </>
  );
}

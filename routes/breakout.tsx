import { Head } from "$fresh/runtime.ts";
import Breakout from "../islands/Breakout.tsx";
// import { signal } from "@preact/signals";

export default function Page() {
  return (
    <>
      <Head>
        <title>Fresh Breakout</title>
      </Head>
      <div>Breakout</div>
      <Breakout />
    </>
  );
}

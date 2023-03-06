import { Head } from "$fresh/runtime.ts";
import TwoZeroFourEight from "../islands/TwoZeroFourEight.tsx";

export default function Page() {
  return (
    <>
      <Head>
        <title>Fresh 2048</title>
      </Head>
      <div>2048</div>
      <TwoZeroFourEight />
    </>
  );
}

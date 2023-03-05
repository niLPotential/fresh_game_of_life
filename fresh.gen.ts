// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/2048.tsx";
import * as $1 from "./routes/breakout.tsx";
import * as $2 from "./routes/game-of-life.tsx";
import * as $3 from "./routes/index.tsx";
import * as $4 from "./routes/snake-game.tsx";
import * as $$0 from "./islands/Footer.tsx";
import * as $$1 from "./islands/GameOfLife.tsx";
import * as $$2 from "./islands/SnakeGame.tsx";

const manifest = {
  routes: {
    "./routes/2048.tsx": $0,
    "./routes/breakout.tsx": $1,
    "./routes/game-of-life.tsx": $2,
    "./routes/index.tsx": $3,
    "./routes/snake-game.tsx": $4,
  },
  islands: {
    "./islands/Footer.tsx": $$0,
    "./islands/GameOfLife.tsx": $$1,
    "./islands/SnakeGame.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;

import { Grid } from "../lib/grid.ts";

export default function TwoZeroFourEight() {
  const grid = new Grid(4);

  return (
    <div>
      {grid.cells[0]}
    </div>
  );
}

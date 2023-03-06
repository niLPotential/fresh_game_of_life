import { JSX } from "preact";
import Tile from "./Tile.tsx";

export default function Grid({ grid }: { grid: number[][] }) {
  const full: JSX.Element[] = [];

  grid.forEach((row) => {
    row.forEach((cloumn) => {
      full.push(
        <Tile value={cloumn} />,
      );
    });
  });

  return (
    <div className="grid grid-cols-4">
      {full}
    </div>
  );
}

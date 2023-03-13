import { GameManager } from "../lib/game_manager.ts";
import { Grid } from "../lib/grid.ts";

export default function TwoZeroFourEight() {
  const gameManager = new GameManager();
  gameManager.addStartTiles();

  return (
    <div>
      <Board grid={gameManager.grid} />
    </div>
  );
}

function Board({ grid }: { grid: Grid }) {
  const tileList = grid.cells.map((row) =>
    row.map((tile) => <Tile value={tile ? tile.value : 0} />)
  );

  return <div>{tileList}</div>;
}

function Tile({ value }: { value: number }) {
  return <div>{value}</div>;
}

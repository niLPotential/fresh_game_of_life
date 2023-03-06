import { Position, Tile } from "./tile.ts";

export class Grid {
  size: number;
  cells: (Tile | null)[][];

  constructor(size: number) {
    this.size = size;
    this.cells = this.empty();
  }

  // Build a grid of the specified size
  empty = () => {
    const cells = [];

    for (let x = 0; x < this.size; x++) {
      const row = [];

      for (let y = 0; y < this.size; y++) {
        row.push(null);
      }

      cells.push(row);
    }

    return cells;
  };

  fromState = () => {};

  // Find the first available random position
  randomAvailableCell = () => {
    const cells = this.availableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    } else {
      return { x: -1, y: -1 };
    }
  };

  availableCells = () => {
    const cells: Position[] = [];
    this.eachCell((x, y, tile) => {
      if (!tile) {
        cells.push({ x, y });
      }
    });
    return cells;
  };

  // Call callback for every cell
  eachCell = (
    callback: (x: number, y: number, tile: Tile | null) => void,
  ) => {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  };

  // Check if there are any cells available
  cellsAvailable = () => {
    return !!this.availableCells().length;
  };

  // Check if the specified cell is taken
  cellAvailable = (cell: Position) => {
    return !this.cellOccupied(cell);
  };

  cellOccupied = (cell: Position) => {
    return !!this.cellContent(cell);
  };

  cellContent = (cell: Position) => {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    } else {
      return null;
    }
  };

  // Inserts a tile at its position
  insertTile = (tile: Tile) => {
    this.cells[tile.x][tile.y] = tile;
  };

  removeTile = (tile: Tile) => {
    this.cells[tile.x][tile.y] = null;
  };

  withinBounds = (position: Position) => {
    return position.x >= 0 && position.x < this.size &&
      position.y >= 0 && position.y < this.size;
  };
}

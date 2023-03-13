import { Grid } from "./grid.ts";
import { Position, Tile } from "./tile.ts";

type Vector = {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
};

export class GameManager {
  startTiles = 2;
  grid: Grid;
  score: number;
  over: boolean;
  won: boolean;

  constructor() {
    this.grid = new Grid();
    this.score = 0;
    this.over = false;
    this.won = false;
  }

  // Set up the initial tiles to start the game with
  addStartTiles = () => {
    for (let i = 0; i < this.startTiles; i++) {
      this.addRandomTile();
    }
  };

  // Adds a tile in a random position
  addRandomTile = () => {
    if (this.grid.cellsAvailable()) {
      const value = Math.random() < 0.9 ? 2 : 4;
      const tile = new Tile(this.grid.randomAvailableCell(), value);

      this.grid.insertTile(tile);
    }
  };

  // Save all tile positions and remove merger info
  prepareTiles = () => {
    this.grid.eachCell((_x, _y, tile) => {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    });
  };

  // Move a tile and its representation
  moveTile = (tile: Tile, cell: Position) => {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  };

  move = (direction: number) => {
    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);
    let moved = false;

    this.prepareTiles();

    traversals.x.forEach((x) => {
      traversals.y.forEach((y) => {
        const cell = { x, y };
        const tile = this.grid.cellContent(cell);

        if (tile) {
          const positions = this.findFarthestPosition(cell, vector);
          const next = this.grid.cellContent(positions.next);

          // Only one merger per row traversal?
          if (next && next.value == tile.value && !next.mergedFrom) {
            const merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [tile, next];

            this.grid.insertTile(merged);
            this.grid.removeTile(tile);

            // Converge the two tiles' positions
            tile.updatePosition(positions.next);

            // Update the score
            this.score += merged.value;

            // The mighty 2048 tile
            if (merged.value == 2048) this.won = true;
          } else {
            this.moveTile(tile, positions.farthest);
          }

          if (!this.positionsEqual(cell, tile)) {
            moved = true; // This tile moved from its original cell!
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();
      if (!this.movesAvailable()) {
        this.over = true; // Game over!
      }
    }
  };

  // Get the vector representing the chosen direction
  getVector = (direction: number): Vector => {
    switch (direction) {
      case 0:
        return { x: 0, y: -1 }; // Up
      case 1:
        return { x: 1, y: 0 }; // Right
      case 2:
        return { x: 0, y: 1 }; // Down
      case 3:
        return { x: -1, y: 0 }; // Left
      default:
        return { x: 0, y: 0 };
    }
  };

  // Build a list of positions to traverse in the right order
  buildTraversals = (vector: Vector) => {
    const traversals: { x: number[]; y: number[] } = { x: [], y: [] };

    for (let pos = 0; pos < Grid.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  };

  findFarthestPosition = (cell: Position, vector: Vector) => {
    let previous;
    // Progress towards the vector direction until an obstacle is found
    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (
      this.grid.withinBounds(cell) &&
      this.grid.cellAvailable(cell)
    );

    return {
      farthest: previous,
      next: cell, // Used to check if a merge is required
    };
  };

  movesAvailable = () => {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  };

  // Check for available matches between tiles (more expensive check)
  tileMatchesAvailable = () => {
    for (let x = 0; x < Grid.size; x++) {
      for (let y = 0; y < Grid.size; y++) {
        const tile = this.grid.cellContent({ x, y });

        if (tile) {
          for (let direction = 0; direction < 4; direction++) {
            const vector = this.getVector(direction);
            const cell = { x: x + vector.x, y: y + vector.y };

            const other = this.grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }
    return false;
  };

  positionsEqual = (first: Position, second: Position) => {
    return first.x === second.x && first.y === second.y;
  };
}

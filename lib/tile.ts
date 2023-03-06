export interface Position {
  x: number;
  y: number;
}

export class Tile {
  x: number;
  y: number;
  value: number | 2;
  previousPosition: Position | null;
  mergedFrom: null; // Tracks tiles that merged together

  constructor(position: Position, value: number) {
    this.x = position.x;
    this.y = position.y;
    this.value = value;
    this.previousPosition = null;
    this.mergedFrom = null;
  }

  savePosition = () => {
    this.previousPosition = { x: this.x, y: this.y };
  };

  updatePosition = (position: Position) => {
    this.x = position.x;
    this.y = position.y;
  };
}

export class Board {
  static rows = 10;
  static columns = 10;
  static neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [
    1,
    -1,
  ], [0, -1]];

  status: boolean[][];
  generation: number;
  isGameRunning: boolean;

  constructor(cellStatus?: () => boolean) {
    this.status = Board.newStatus(cellStatus);
    this.generation = 0;
    this.isGameRunning = false;
  }

  static fromTemplate(template: number[][]) {
    const newBoard = new Board(() => false);

    for (const [r, c] of template) {
      newBoard.status[r][c] = true;
    }
    return newBoard;
  }

  static newStatus(
    cellStatus = () => Math.random() < 0.3,
  ) {
    const status: boolean[][] = [];
    for (let r = 0; r < Board.rows; r++) {
      status[r] = [];
      for (let c = 0; c < Board.columns; c++) {
        status[r][c] = cellStatus();
      }
    }
    return status;
  }

  toggleCellStatus(r: number, c: number) {
    this.status[r][c] = !this.status[r][c];
  }

  amountTrueNeighbors(r: number, c: number) {
    return Board.neighbors.reduce((trueNeighbors, neighbor) => {
      const x = r + neighbor[0];
      const y = c + neighbor[1];
      const isNeighborOnBoard = x >= 0 && x < Board.rows &&
        y >= 0 && y < Board.columns;
      if (trueNeighbors < 4 && isNeighborOnBoard && this.status[x][y]) {
        return trueNeighbors + 1;
      } else {
        return trueNeighbors;
      }
    }, 0);
  }

  nextStep() {
    const clonedStatus = JSON.parse(JSON.stringify(this.status));

    for (let r = 0; r < Board.rows; r++) {
      for (let c = 0; c < Board.columns; c++) {
        const totalTrueNeighbors = this.amountTrueNeighbors(r, c);

        if (!this.status[r][c]) {
          if (totalTrueNeighbors === 3) {
            clonedStatus[r][c] = true;
          }
        } else {
          if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3) {
            clonedStatus[r][c] = false;
          }
        }
      }
    }

    this.status = clonedStatus;
  }

  clone() {
    const cloned = new Board(() => false);

    cloned.status = this.status;
    cloned.generation = this.generation;
    cloned.isGameRunning = this.isGameRunning;

    return cloned;
  }
}

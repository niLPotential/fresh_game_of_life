import { useState } from "preact/hooks";
import { BoardGrid } from "../components/Board.tsx";
import { Button } from "../components/Button.tsx";

const totalBoardRows = 10;
const totalBoardColumns = 10;

export interface BoardState {
  boardStatus: boolean[][];
  generation: number;
  isGameRunning: boolean;
}

const newBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
  const grid: boolean[][] = [];
  for (let r = 0; r < totalBoardRows; r++) {
    grid[r] = [];
    for (let c = 0; c < totalBoardColumns; c++) {
      grid[r][c] = cellStatus();
    }
  }
  return grid;
};

export default function GameOfLife() {
  const initialState: BoardState = {
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
  };

  const [state, setState] = useState(initialState);

  const handleToggleStatus = (r: number, c: number) => {
    const toggleBoardStatus = (boardStatus: BoardState["boardStatus"]) => {
      const toggledBoardStatus = JSON.parse(JSON.stringify(boardStatus));
      toggledBoardStatus[r][c] = !toggledBoardStatus[r][c];
      return toggledBoardStatus;
    };
    setState({
      ...state,
      boardStatus: toggleBoardStatus(state.boardStatus),
    });
  };

  const handleUpdate = () => {
    const nextStep = (boardStatus: BoardState["boardStatus"]) => {
      const nextBoardStatus: BoardState["boardStatus"] = JSON.parse(
        JSON.stringify(boardStatus),
      );

      const countAliveNeighbors = (r: number, c: number) => {
        const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [
          1,
          -1,
        ], [0, -1]];
        return neighbors.reduce((aliveNeighbors, neighbor) => {
          const x = r + neighbor[0];
          const y = c + neighbor[1];
          const isNeighborOnBoard =
            (x >= 0 && x < totalBoardRows && y >= 0 && y < totalBoardColumns);
          if (isNeighborOnBoard && boardStatus[x][y]) {
            return aliveNeighbors + 1;
          } else {
            return aliveNeighbors;
          }
        }, 0);
      };

      for (let r = 0; r < totalBoardRows; r++) {
        for (let c = 0; c < totalBoardColumns; c++) {
          const aliveNeighborsCount = countAliveNeighbors(r, c);

          if (boardStatus[r][c]) {
            if (aliveNeighborsCount < 2 || aliveNeighborsCount > 3) {
              nextBoardStatus[r][c] = false;
            }
          } else {
            if (aliveNeighborsCount === 3) {
              nextBoardStatus[r][c] = true;
            }
          }
        }
      }

      return nextBoardStatus;
    };

    const nextBoardStatus = nextStep(
      state.boardStatus,
    );

    setState({
      ...state,
      boardStatus: nextBoardStatus,
      generation: state.generation + 1,
    });
  };

  return (
    <div>
      <BoardGrid boardState={state} onToggleCellStatus={handleToggleStatus} />
      <Button
        onClick={() =>
          setState({
            ...state,
            isGameRunning: !state.isGameRunning,
          })}
      >
        Auto
      </Button>
      <Button>New</Button>
      <Button
        onClick={() => {
          handleUpdate();
        }}
      >
        Next
      </Button>
      <Button
        onClick={() =>
          setState({
            ...state,
            generation: 0,
            boardStatus: newBoardStatus(() => false),
          })}
      >
        Clear
      </Button>
      <Button>Deno</Button>
      <Button>Fresh</Button>
    </div>
  );
}

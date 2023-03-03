import { useEffect, useState } from "preact/hooks";
import { BoardGrid } from "../components/Board.tsx";
import { Button } from "../components/Button.tsx";
import { Slider } from "../components/Slider.tsx";
import { denoTemplate, freshTemplate } from "../static/template.ts";
import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/plus.tsx";
import IconMinus from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/minus.tsx";

const totalBoardRows = 10;
const totalBoardColumns = 10;

export interface BoardState {
  boardStatus: boolean[][];
  generation: number;
  isGameRunning: boolean;
  speed: number;
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

const templateBoardStatus = (template: number[][]) => {
  const grid = newBoardStatus(() => false);

  for (const index of template) {
    grid[index[0]][index[1]] = true;
  }
  return grid;
};

export default function GameOfLife() {
  const initialState: BoardState = {
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 500,
  };

  const [state, setState] = useState(initialState);

  const runStopButton = () => {
    return state.isGameRunning
      ? <Button onClick={handleStop}>Stop</Button>
      : <Button onClick={handleRun}>Start</Button>;
  };

  const handleClearBoard = () =>
    setState((prevState) => ({
      ...prevState,
      boardStatus: newBoardStatus(() => false),
      generation: 0,
      isGameRunning: false,
    }));

  const handleNewBoard = () => {
    setState((prevState) => ({
      ...prevState,
      boardStatus: newBoardStatus(),
      generation: 0,
      isGameRunning: false,
    }));
  };

  const handleTemplateBoard = (template: number[][]) => {
    setState((prevState) => ({
      ...prevState,
      boardStatus: templateBoardStatus(template),
      generation: 0,
      isGameRunning: false,
    }));
  };

  const handleToggleStatus = (r: number, c: number) => {
    const toggleBoardStatus = (prevStatus: BoardState["boardStatus"]) => {
      const clonedBoardStatus = JSON.parse(JSON.stringify(prevStatus));
      clonedBoardStatus[r][c] = !clonedBoardStatus[r][c];
      return clonedBoardStatus;
    };

    setState((prevState) => ({
      ...prevState,
      boardStatus: toggleBoardStatus(prevState["boardStatus"]),
    }));
  };

  const handleStep = () => {
    const nextStep = (boardStatus: BoardState["boardStatus"]) => {
      const clonedBoardStatus: BoardState["boardStatus"] = JSON.parse(
        JSON.stringify(boardStatus),
      );

      const amountTrueNeighbors = (r: number, c: number) => {
        const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [
          1,
          -1,
        ], [0, -1]];
        return neighbors.reduce((trueNeighbors, neighbor) => {
          const x = r + neighbor[0];
          const y = c + neighbor[1];
          const isNeighborOnBoard = x >= 0 && x < totalBoardRows && y >= 0 &&
            y < totalBoardColumns;
          if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
            return trueNeighbors + 1;
          } else {
            return trueNeighbors;
          }
        }, 0);
      };

      for (let r = 0; r < totalBoardRows; r++) {
        for (let c = 0; c < totalBoardColumns; c++) {
          const totalTrueNeighbors = amountTrueNeighbors(r, c);

          if (!boardStatus[r][c]) {
            if (totalTrueNeighbors === 3) {
              clonedBoardStatus[r][c] = true;
            }
          } else {
            if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3) {
              clonedBoardStatus[r][c] = false;
            }
          }
        }
      }

      return clonedBoardStatus;
    };

    setState((prevState) => ({
      ...prevState,
      boardStatus: nextStep(
        prevState["boardStatus"],
      ),
      generation: prevState.generation + 1,
    }));
  };

  const handleSpeedChange = (newSpeed: number) => {
    setState((prevState) => ({ ...prevState, speed: newSpeed }));
  };

  const handleRun = () => {
    setState((prevState) => ({ ...prevState, isGameRunning: true }));
  };

  const handleStop = () => {
    setState((prevState) => ({ ...prevState, isGameRunning: false }));
  };

  useEffect(() => {
    let timerID = 0;
    if (state.isGameRunning) {
      timerID = setInterval(() => handleStep(), state.speed);
    }
    return () => clearInterval(timerID);
  });

  return (
    <div>
      <BoardGrid
        boardStatus={state.boardStatus}
        onToggleCellStatus={handleToggleStatus}
      />

      <div className="flex justify-around my-2.5">
        <div className="flex text-xs sm:text-base">
          <IconPlus
            onClick={() => handleSpeedChange(Math.max(state.speed - 50, 50))}
          />
          <Slider speed={state.speed} onSpeedChange={handleSpeedChange} />
          <IconMinus
            onClick={() => handleSpeedChange(Math.min(state.speed + 50, 1000))}
          />
        </div>
        <div className="text-lg sm:text-xl">
          {`Gen: ${state.generation}`}
        </div>
      </div>

      <div className="flex justify-center sm:justify-between my-2.5">
        {runStopButton()}

        <Button
          disabled={state.isGameRunning}
          onClick={handleStep}
        >
          Next
        </Button>

        <Button
          onClick={handleClearBoard}
        >
          Clear
        </Button>

        <Button
          onClick={handleNewBoard}
        >
          New
        </Button>

        <Button
          onClick={() => handleTemplateBoard(denoTemplate)}
        >
          Deno
        </Button>

        <Button
          onClick={() => handleTemplateBoard(freshTemplate)}
        >
          Fresh
        </Button>
      </div>
    </div>
  );
}

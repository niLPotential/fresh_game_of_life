import { useEffect, useState } from "preact/hooks";
import { BoardGrid } from "../components/game-of-life/Board.tsx";
import { Button } from "../components/Button.tsx";
import { Board } from "../lib/game_of_life.ts";
import { speed } from "../lib/speed.ts";
import template from "../static/template.json" assert {
  type: "json",
};

export default function GameOfLife() {
  const [boardState, setBoardState] = useState(new Board());

  const runStopButton = () => {
    return boardState.isGameRunning
      ? <Button onClick={handleStop}>Stop</Button>
      : <Button onClick={handleRun}>Start</Button>;
  };

  const handleClearBoard = () => setBoardState(new Board(() => false));

  const handleNewBoard = () => {
    setBoardState(new Board());
  };

  const handleTemplateBoard = (template: number[][]) => {
    setBoardState(Board.fromTemplate(template));
  };

  const handleToggleStatus = (r: number, c: number) => {
    setBoardState((prevState) => {
      const newState = prevState.clone();
      newState.toggleCellStatus(r, c);
      return newState;
    });
  };

  const handleStep = () => {
    setBoardState((prevState) => {
      const newState = prevState.clone();
      newState.nextStep();
      newState.generation++;
      return newState;
    });
  };

  const handleRun = () => {
    setBoardState((prevState) => {
      const newState = prevState.clone();
      newState.isGameRunning = true;
      return newState;
    });
  };

  const handleStop = () => {
    setBoardState((prevState) => {
      const newState = prevState.clone();
      newState.isGameRunning = false;
      return newState;
    });
  };

  useEffect(() => {
    let timerID = 0;
    if (boardState.isGameRunning) {
      timerID = setInterval(() => handleStep(), speed.value);
    }
    return () => clearInterval(timerID);
  });

  return (
    <div>
      <BoardGrid
        boardStatus={boardState.status}
        onToggleCellStatus={handleToggleStatus}
      />

      <div className="flex justify-around my-2.5">
        <div className="text-lg sm:text-xl">
          {`Gen: ${boardState.generation}`}
        </div>
      </div>

      <div className="flex justify-center sm:justify-between my-2.5">
        {runStopButton()}

        <Button
          disabled={boardState.isGameRunning}
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
          onClick={() => handleTemplateBoard(template.deno)}
        >
          Deno
        </Button>

        <Button
          onClick={() => handleTemplateBoard(template.fresh)}
        >
          Fresh
        </Button>
      </div>
    </div>
  );
}

import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { Board } from "../lib/game_of_life.ts";
import { speed } from "../lib/speed.ts";
import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/plus.tsx";
import IconMinus from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/minus.tsx";
import template from "../static/template.json" assert { type: "json" };

export default function GameOfLife() {
  const [boardState, setBoardState] = useState(new Board());

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

  const buttonsList = [
    boardState.isGameRunning
      ? { name: "Stop", onClick: handleStop, disabled: false }
      : { name: "Run", onClick: handleRun, disabled: false },
    { name: "Next", onClick: handleStep, disabled: boardState.isGameRunning },
    { name: "Clear", onClick: handleClearBoard, disabled: false },
    { name: "New", onClick: handleNewBoard, disabled: false },
    {
      name: "Deno",
      onClick: () => handleTemplateBoard(template.deno),
      disabled: false,
    },
    {
      name: "Fresh",
      onClick: () => handleTemplateBoard(template.fresh),
      disabled: false,
    },
  ];

  return (
    <div>
      <Grid
        status={boardState.status}
        onToggleStatus={handleToggleStatus}
      />

      <div className="flex justify-around my-2.5">
        <SpeedSlider />
        <div className="text-lg sm:text-xl">
          {`Gen: ${boardState.generation}`}
        </div>
      </div>

      <div className="flex justify-center sm:justify-between my-2.5">
        {buttonsList.map(({ name, onClick, disabled }) => (
          <Button onClick={onClick} disabled={disabled}>{name}</Button>
        ))}
      </div>
    </div>
  );
}

function SpeedSlider() {
  return (
    <div className="flex text-xs sm:text-base">
      <IconPlus
        onClick={() => speed.value = Math.max(speed.value - 50, 50)}
      />
      <input
        type="range"
        min="50"
        max="1000"
        step="50"
        value={speed.value}
        onChange={(e) =>
          speed.value = (e.target as HTMLInputElement).valueAsNumber}
      />
      <IconMinus
        onClick={() => speed.value = Math.min(speed.value + 50, 1000)}
      />
    </div>
  );
}

function Grid(
  { status, onToggleStatus }: {
    status: boolean[][];
    onToggleStatus: (r: number, c: number) => void;
  },
) {
  const handleClick = (r: number, c: number) => onToggleStatus(r, c);

  const tr: JSX.Element[] = [];
  status.forEach((row, rowIndex) => {
    const td: JSX.Element[] = [];
    row.forEach((cell, columnIndex) => {
      td.push(
        <td
          key={`${rowIndex},${columnIndex}`}
          className={`border w-8 h-8 sm:w-10 sm:h-10 ${
            cell ? "bg-black hover:bg-red-500" : "bg-white hover:bg-gray-500"
          }`}
          onClick={() => handleClick(rowIndex, columnIndex)}
        />,
      );
    });
    tr.push(<tr key={rowIndex}>{td}</tr>);
  });

  return (
    <table className="flex justify-center">
      <tbody>{tr}</tbody>
    </table>
  );
}

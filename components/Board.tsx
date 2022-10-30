import { JSXInternal } from "https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts";
import { BoardState } from "../islands/GameOfLife.tsx";

const alive = "bg-black  hover:bg-red-600";
const dead = "bg-white hover:bg-gray-600";

interface BoardProps {
  boardState: BoardState;
  onToggleCellStatus: (r: number, c: number) => void;
}

export function BoardGrid(props: BoardProps) {
  const tr: JSXInternal.Element[] = [];
  props.boardState.boardStatus.forEach((row, rowIndex) => {
    const td: JSXInternal.Element[] = [];
    row.forEach((cell, columnIndex) => {
      td.push(
        <td
          key={`${rowIndex},${columnIndex}`}
          className={`border-1 w-10 h-10 ${cell ? alive : dead}`}
          onClick={() => props.onToggleCellStatus(rowIndex, columnIndex)}
        />,
      );
    });
    tr.push(<tr>{td}</tr>);
  });

  return (
    <table>
      <tbody>{tr}</tbody>
    </table>
  );
}

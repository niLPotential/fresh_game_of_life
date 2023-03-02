import { JSXInternal } from "preact/src/jsx.d.ts";
import { BoardState } from "../islands/GameOfLife.tsx";

const alive = "bg-black  hover:bg-red-600";
const dead = "bg-white hover:bg-gray-600";

interface BoardProps {
  boardStatus: BoardState["boardStatus"];
  onToggleCellStatus: (r: number, c: number) => void;
}

export function BoardGrid(props: BoardProps) {
  const handleClick = (r: number, c: number) => props.onToggleCellStatus(r, c);

  const tr: JSXInternal.Element[] = [];
  props.boardStatus.forEach((row, rowIndex) => {
    const td: JSXInternal.Element[] = [];
    row.forEach((cell, columnIndex) => {
      td.push(
        <td
          key={`${rowIndex},${columnIndex}`}
          className={`border-1 w-10 h-10 ${cell ? alive : dead}`}
          onClick={() => handleClick(rowIndex, columnIndex)}
        />,
      );
    });
    tr.push(<tr key={rowIndex}>{td}</tr>);
  });

  return (
    <table>
      <tbody>{tr}</tbody>
    </table>
  );
}

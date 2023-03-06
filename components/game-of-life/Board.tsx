import { JSX } from "preact";
import { BoardState } from "../../islands/GameOfLife.tsx";

interface BoardProps {
  boardStatus: BoardState["boardStatus"];
  onToggleCellStatus: (r: number, c: number) => void;
}

export function BoardGrid(props: BoardProps) {
  const handleClick = (r: number, c: number) => props.onToggleCellStatus(r, c);

  const tr: JSX.Element[] = [];
  props.boardStatus.forEach((row, rowIndex) => {
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

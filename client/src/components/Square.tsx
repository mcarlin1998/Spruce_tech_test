import React from "react";
import { SquareValues } from "../types";

export default function Square({
  handleClick,
  rowPos,
  colPos,
  column,
  player,
  winner,
}: SquareValues) {
  return (
    <div
      className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
      onClick={() => {
        !winner && handleClick(rowPos, colPos, player);
      }}
      key={colPos}
    >
      {column}
    </div>
  );
}

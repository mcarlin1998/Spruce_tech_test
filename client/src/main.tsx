import React, { useState } from "react";
import { XorO } from "./types";
import Square from "./components/Square";

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [player, setPlayer] = useState<string>("X");

  function handleClick(
    rowPos: number,
    colPos: number,
    playerCheck: string
  ): (XorO | undefined)[][] {
    const shape: XorO = playerCheck === "X" ? "X" : "O";

    let updatedBoard: (XorO | undefined)[][] = [];

    // Use a functional state update to avoid referencing the same board
    setBoard((prevBoard) => {
      // Create a deep copy of the board
      const boardCopy = prevBoard.map((row) => row.slice());

      // Check if the cell is already occupied
      if (boardCopy[rowPos][colPos]) {
        return prevBoard; // If occupied, return the previous board state
      }

      // Update the board with the player's shape
      boardCopy[rowPos][colPos] = shape;

      // Return the updated board
      updatedBoard = boardCopy;
      return boardCopy;
    });
    return updatedBoard;
  }

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex flex-col gap-1">
        {board.map((row, rowPos: number) => (
          <div className="flex gap-1" key={rowPos}>
            {row.map((column, colPos: number) => {
              return (
                <Square
                  key={colPos}
                  handleClick={handleClick}
                  rowPos={rowPos}
                  colPos={colPos}
                  column={column}
                  player={player}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

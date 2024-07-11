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
  const [winner, setWinner] = useState<string | null>(null);

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
      const result = checkWinner(boardCopy, shape);

      if (result) {
        setWinner(playerCheck);
      } else {
        setPlayer(shape === "X" ? "O" : "X");
      }

      // Return the updated board
      updatedBoard = boardCopy;
      return boardCopy;
    });
    return updatedBoard;
  }

  function checkWinner(boardArr, shape) {
    const lines = [
      // Horizontal winning combinations
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],

      // Vertical winning combinations
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],

      // Diagonal winning combinations
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        boardArr[a[0]][a[1]] === shape &&
        boardArr[b[0]][b[1]] === shape &&
        boardArr[c[0]][c[1]] === shape
      ) {
        return true;
      }
    }
    return false;
  }

  function handleReset() {
    //Create a copy of the current state and adjust all values to be 'undefined' in the case that the grid is any size from 3 to 15
    setBoard((prevBoard) => {
      let boardResetCopy = prevBoard.map((row) => row.map(() => undefined));
      return boardResetCopy;
    });
    //set Winner state to false
    setWinner(null);
    //Set default player back to playerX
    setPlayer("X");
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
      {winner ? (
        <div className="mt-10 flex flex-col items-center">
          <div>Winner is Player {winner}</div>

          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-10"
            onClick={() => handleReset()}
          >
            Play Again?
          </button>
        </div>
      ) : null}
    </div>
  );
};

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
  const [gridSize, setGridSize] = useState<number>(3);
  const [winLength, setWinLength] = useState<number>(3);

  function handleClick(rowPos: number, colPos: number, playerCheck: string) {
    console.log(rowPos, colPos, playerCheck);
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

  function generateWinningLines(gridSize: number) {
    const lines: number[][][] = [];

    // Rows
    //Loops over each column index in the row where winLength can begin
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j <= gridSize - winLength; j++) {
        const row: number[][] = [];
        for (let k = 0; k < winLength; k++) {
          row.push([i, j + k]);
        }
        lines.push(row);
      }
    }

    // Columns
    for (let j = 0; j < gridSize; j++) {
      for (let i = 0; i <= gridSize - winLength; i++) {
        const col: number[][] = [];
        for (let k = 0; k < winLength; k++) {
          col.push([i + k, j]);
        }
        lines.push(col);
      }
    }

    // Diagonals (Top-Left to Bottom-Right)
    //Loops over possible starting points for the row and column for the Diagonal lines
    for (let i = 0; i <= gridSize - winLength; i++) {
      for (let j = 0; j <= gridSize - winLength; j++) {
        const diag1: number[][] = [];
        for (let k = 0; k < winLength; k++) {
          diag1.push([i + k, j + k]);
        }
        lines.push(diag1);
      }
    }

    // Diagonals (Bottom-Left to Top-Right)
    //Loops over possible starting points for the row and column for the opposite Diagonal lines
    for (let i = 0; i <= gridSize - winLength; i++) {
      for (let j = winLength - 1; j < gridSize; j++) {
        const diag2: number[][] = [];
        for (let k = 0; k < winLength; k++) {
          diag2.push([i + k, j - k]);
        }
        lines.push(diag2);
      }
    }

    return lines;
  }

  function checkWinner(boardArr: (XorO | undefined)[][], shape: string) {
    const lines = generateWinningLines(gridSize);
    for (let line of lines) {
      //let a, b, c equal the a winning combo for the gridSize
      const [a, b, c] = line;
      //If all 3 cells options match the shape then return true
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

  function handleGridChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    //store value as a number
    const gridChangeValue = parseInt(e.target.value);
    //If the value isnt between 3 and 15 do nothing (Should return an error prompt notifying user)
    if (gridChangeValue < 3 || gridChangeValue > 15) {
      return;
    }
    //Set the adjusted size in state and then run the generate function
    setGridSize(gridChangeValue);
    generateBoard(gridChangeValue);
  }

  function generateBoard(newGridSize: number) {
    //Intialise an empty array to store new board size
    let boardToSet: undefined[][] = [];
    //Create a loop that will run as long as its less that newGridSize
    // TODO: Make this more efficient - array methods could probably remove the need for a loop.
    for (let i = 0; i < newGridSize; i++) {
      //Push an empty array which will store a row of undefined
      boardToSet.push([]);
      //Add as many undefined cells as the value of newGridSize
      for (let o = 0; o < newGridSize; o++) {
        boardToSet[i].push(undefined);
      }
    }
    setBoard(boardToSet);
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
      <div className="flex text-xl mt-10 justify-center">
        <h1>Grid Size:</h1>
        <input
          type="number"
          id="gridSizeInput"
          name="gridSize"
          placeholder="Grid Size"
          defaultValue={gridSize}
          onChange={handleGridChange}
          min="3"
          max="15"
          className="ml-5 text-center"
        />
      </div>
    </div>
  );
};

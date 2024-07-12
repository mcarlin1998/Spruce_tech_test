export type XorO = "X" | "O";

export type SquareValues = {
  winner: string | null;
  handleClick: (
    rowPos: number,
    colPos: number,
    playerCheck: string
  ) => (XorO | undefined)[][];
  rowPos: number;
  colPos: number;
  column: string | undefined;
  player: string;
};

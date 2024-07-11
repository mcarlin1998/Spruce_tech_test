export type XorO = "X" | "O";

export type SquareValues = {
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

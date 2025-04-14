export type Player = 'X' | 'O';
export type Board = (Player | null)[];
export type ResultGame = 'Victory of X' | 'Victory of O' | 'Draw' | 'Continued' | 'Position occupied!'

export interface PlayResult {
  board: Board;
  result: ResultGame;
}
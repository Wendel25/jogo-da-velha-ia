import { Trophy } from "lucide-react";

interface StatusProps {
  squares: (string | null)[];
  xIsNext: boolean;
  calculateWinner: (squares: (string | null)[]) => { winner: string; line: number[] } | null;
}

export default function Status({ squares, xIsNext, calculateWinner }: StatusProps) {
  const winner = calculateWinner(squares);

  if (winner) {
    return (
      <div className="flex items-center justify-center gap-2 text-green-600">
        <Trophy size={24} />
        <span className="font-bold">Winner: {winner.winner === "X" ? "Player X" : "Player O"}</span>
      </div>
    );
  }

  if (!squares.includes(null)) {
    return <div className="text-amber-600 font-bold">Game ended in a tie!</div>;
  }

  return (
    <div className={xIsNext ? "text-blue-500 font-bold" : "text-green-500 font-bold"}>
      Next player: {xIsNext ? "X" : "O"}
    </div>
  );
}

import { Trophy } from "lucide-react";

interface StatusProps {
  squares: (string | null)[];
  calculateWinner: (squares: (string | null)[]) => { winner: string; line: number[] } | null;
}

export default function Status({ squares, calculateWinner }: StatusProps) {
  const winner = calculateWinner(squares);
  const isX = winner?.winner === "X" ? true : false;

  if (winner) {
    return (
      <div className="flex items-center justify-center gap-2 text-green-600">
        <Trophy size={24} className={`${isX ? "text-blue-600" : "text-green-600"}`} />
        <span className={`${isX ? "text-blue-600" : "text-green-600"} font-bold`}>
          Winner: {isX ? "Player X" : "AI MinMax"}
        </span>
      </div>
    );
  }

  if (!squares.includes(null)) {
    return <div className="text-amber-600 font-bold">Game ended in a tie!</div>;
  }

  return null;
}

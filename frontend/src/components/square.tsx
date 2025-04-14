import { X, Circle } from "lucide-react";

interface SquareProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinningSquare?: boolean;
}

export default function Square({ value, onClick, isWinningSquare }: SquareProps) {
  let classes = "h-24 w-24 flex items-center justify-center text-4xl font-bold rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 ";

  classes += isWinningSquare ? "bg-gradient-to-br from-green-300 to-green-400 shadow-lg " : "bg-white shadow-md hover:shadow-lg ";

  classes +=
    value === "X" ? "border-blue-400 border-2" : value === "O" ? "border-green-400 border-2" : "border-gray-200 border";

  return (
    <div className={classes} onClick={onClick}>
      {value === "X" && <X size={36} className="text-blue-500" />}
      {value === "O" && <Circle size={36} className="text-green-500" />}
    </div>
  );
}

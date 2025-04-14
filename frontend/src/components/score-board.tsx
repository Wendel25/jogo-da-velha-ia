import { X, Circle } from "lucide-react";

interface ScoreBoardProps {
  scores: { x: number; o: number; ties: number };
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <div className="flex justify-between mb-6">
      <div className="bg-white p-3 rounded-xl shadow-md w-28 text-center">
        <div className="flex items-center justify-center gap-1 font-bold text-blue-500 mb-1">
          <X size={16} />
          <span>Player</span>
        </div>
        <div className="text-3xl font-bold text-blue-600">{scores.x}</div>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-md w-28 text-center">
        <div className="font-bold text-gray-500 mb-1">Draw</div>
        <div className="text-3xl font-bold text-gray-600">{scores.ties}</div>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-md w-28 text-center">
        <div className="flex items-center justify-center gap-1 font-bold text-green-500 mb-1">
          <Circle size={16} />
          <span>Player</span>
        </div>
        <div className="text-3xl font-bold text-green-600">{scores.o}</div>
      </div>
    </div>
  );
}

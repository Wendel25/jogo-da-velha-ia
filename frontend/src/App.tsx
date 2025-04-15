"use client";

import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { calculateWinner } from "./utils/calculate-game";
import Square from "./components/square";
import ScoreBoard from "./components/score-board";
import Status from "./components/status";
import { handleClickService } from "./utils/new-move";
import { newGame } from "./utils/new-game";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const handleClick = async (i: number) => {
    if (gameOver || squares[i]) return;

    try {
      const response = await handleClickService(i);

      if (response.board) {
        setSquares(response.board);
        setXIsNext(!xIsNext);
      }

      if (response.result && response.result !== "Continued") {
        setGameOver(true);

        if (response.result.includes("Victory")) {
          const winner = response.result.split(" ")[2];
          setScores((prev) => ({
            ...prev,
            [winner.toLowerCase()]: prev[winner.toLowerCase() as "x" | "o"] + 1,
          }));
        } else if (response.result === "Draw") {
          setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
        }
      }
    } catch (err) {
      console.error("Erro ao jogar:", err);
    }
  };

  useEffect(() => {
    handleResetGame();
  }, []);

  const handleResetGame = async () => {
    try {
      const response = await newGame();

      setSquares(response.board);
      setGameOver(false);
      setWinningLine(null);
      setXIsNext(response.starter === "X");
    } catch (err) {
      console.error("Erro ao resetar o jogo:", err);
    }
  };

  const resetGame = () => {
    handleResetGame();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400 px-4 sm:px-6">
      <div className="w-full max-w-sm sm:w-1/2">
        <div className="bg-gray-100 p-4 sm:p-6 rounded-2xl shadow-xl mb-6">
          <ScoreBoard scores={scores} />
          <div className="mb-6 text-center">
            <Status squares={squares} calculateWinner={calculateWinner} />
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
            {squares.map((val, i) => (
              <Square key={i} value={val} onClick={() => handleClick(i)} isWinningSquare={winningLine?.includes(i)} />
            ))}
          </div>
          <button
            onClick={resetGame}
            className="w-full bg-emerald-500 hover:bg-emerald-700 cursor-pointer text-white font-bold py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw size={18} />
            New game
          </button>
        </div>
      </div>
    </div>
  );
}

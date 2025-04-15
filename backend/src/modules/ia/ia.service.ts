import { Injectable } from '@nestjs/common';
import { Board, Player } from 'src/interfaces/play.interface';

@Injectable()
export class IAService {
    public chooseAiMove(board: Board): number {
        const bestMove = this.minimax(board, 'O');
        return bestMove.index;
    }

    private minimax(board: Board, player: Player): { score: number; index: number } {
        const availableMoves = this.getAvailableMoves(board);
        const winner = this.checkWin(board);

        if (winner === 'X') return { score: -1, index: -1 };

        if (winner === 'O') return { score: 1, index: -1 };

        if (availableMoves.length === 0) return { score: 0, index: -1 };

        const moves = availableMoves.map(index => {
            const newBoard = [...board];
            newBoard[index] = player;
            const result = this.minimax(newBoard, player === 'O' ? 'X' : 'O');
            return { score: result.score, index };
        });

        if (player === 'O') {
            return moves.reduce((best, move) =>
                move.score > best.score ? move : best
            );
        } else {
            return moves.reduce((best, move) =>
                move.score < best.score ? move : best
            );
        }
    }

    private getAvailableMoves(board: Board): number[] {
        const available = board.reduce(
            (acc, val, idx) => (val === null ? [...acc, idx] : acc),
            [] as number[]
        );

        for (let i = available.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [available[i], available[j]] = [available[j], available[i]];
        }

        return available;
    }

    checkWin(board: Board): Player | null {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const [a, b, c] of lines) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    }

    public chooseAiMoveWithDifficulty(board: Board, difficulty: 'easy' | 'medium' | 'hard'): number {
        const availableMoves = this.getAvailableMoves(board);

        if (difficulty === 'easy') {
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }

        if (difficulty === 'medium') {
            const useMinimax = Math.random() < 0.5;
            return useMinimax
                ? this.minimax(board, 'O').index
                : availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }

        return this.minimax(board, 'O').index;
    }
}

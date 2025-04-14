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
        return board.reduce(
            (acc, val, idx) => (val === null ? [...acc, idx] : acc),
            [] as number[]
        );
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
}

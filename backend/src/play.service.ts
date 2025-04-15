import { Injectable } from '@nestjs/common';
import { IAService } from 'src/modules/ia/ia.service';
import { Board, Player, PlayResult } from 'src/interfaces/play.interface';

@Injectable()
export class PlayService {
  private board: Board = Array(9).fill(null);

  private currentStarter: Player = 'X';
  private aiDifficulty: 'easy' | 'medium' | 'hard' = 'medium';
  private aiWins = 0;
  private aiLosses = 0;

  constructor(private readonly iaService: IAService) { }

  async handlePlayerMove(position: number, player: Player) {
    const moveResult = this.makeMove(position, player);

    if (moveResult !== 'Continued') {
      this.updateDifficultyIfNeeded(moveResult);
      return this.buildPlayResult(moveResult);
    }

    const aiPosition = this.iaService.chooseAiMoveWithDifficulty(this.board, this.aiDifficulty);
    if (aiPosition !== -1) {
      this.makeMove(aiPosition, 'O');
    }

    const gameStatus = this.checkGameStatus();
    this.updateDifficultyIfNeeded(gameStatus);
    return this.buildPlayResult(gameStatus);
  }

  makeMove(position: number, player: Player): 'Position occupied!' | 'Continued' {
    if (this.isPositionOccupied(position)) {
      return 'Position occupied!';
    }
    this.board[position] = player;
    return 'Continued';
  }

  checkGameStatus(): 'Victory of X' | 'Victory of O' | 'Draw' | 'Continued' {
    const winner = this.iaService.checkWin(this.board);
    if (winner) return `Victory of ${winner}`;
    if (this.isBoardFull()) return 'Draw';
    return 'Continued';
  }

  getBoard(): Board {
    return [...this.board];
  }

  resetGame(): { message: string; board: Board; starter: Player } {
    this.board = Array(9).fill(null);

    this.currentStarter = this.currentStarter === 'X' ? 'O' : 'X';

    if (this.currentStarter === 'O') {
      const aiPos = this.iaService.chooseAiMoveWithDifficulty(this.board, this.aiDifficulty);
      this.makeMove(aiPos, 'O');
    }

    return {
      message: 'Board reset!',
      board: this.getBoard(),
      starter: this.currentStarter,
    };
  }

  private isPositionOccupied(position: number): boolean {
    return this.board[position] !== null;
  }

  private isBoardFull(): boolean {
    return !this.board.includes(null);
  }

  private buildPlayResult(result: PlayResult['result']): Partial<PlayResult> {
    return {
      board: this.getBoard(),
      result,
    };
  }

  private updateDifficultyIfNeeded(result: PlayResult['result']) {
    if (result === 'Victory of X') {
      this.aiLosses++;
      this.aiWins = 0;

      if (this.aiLosses === 3) {
        this.aiDifficulty = 'hard';
      }
    } else if (result === 'Victory of O' || result === 'Draw') {
      this.aiWins++;
      this.aiLosses = 0;

      if (this.aiWins === 3) {
        this.aiDifficulty = 'medium';
      }
    }
  }
}

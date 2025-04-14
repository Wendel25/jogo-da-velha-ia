import { Injectable } from '@nestjs/common';
import { IAService } from 'src/modules/ia/ia.service';
import { Board, Player, PlayResult } from 'src/interfaces/play.interface';

@Injectable()
export class PlayService {
  private board: Board = Array(9).fill(null);

  constructor(private readonly iaService: IAService) { }

  async handlePlayerMove(position: number, player: Player) {
    const moveResult = this.makeMove(position, player);

    if (moveResult !== 'Continued') {
      return this.buildPlayResult(moveResult);
    }

    const aiPosition = this.iaService.chooseAiMove(this.board);
    if (aiPosition !== -1) {
      this.makeMove(aiPosition, 'O');
    }

    const gameStatus = this.checkGameStatus();
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

    if (winner) {
      return `Victory of ${winner}`;
    }
    if (this.isBoardFull()) {
      return 'Draw';
    }
    return 'Continued';
  }

  getBoard(): Board {
    return [...this.board];
  }

  resetGame(): void {
    this.board = Array(9).fill(null);
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
}
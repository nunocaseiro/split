import { LeanDocument } from 'mongoose';
import { QueryBoardArrayDocument } from '../../../../libs/interfaces/query/query.board.interface';
import { BoardDocument } from '../../schemas/board.schema';

export interface GetBoardApplication {
  getAllBoards(userId: string): QueryBoardArrayDocument;
  getBoard(
    boardId: string,
    userId: string,
  ): Promise<LeanDocument<BoardDocument> | null>;
}

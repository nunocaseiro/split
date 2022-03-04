import { LeanDocument } from 'mongoose';
import {
  QueryBoardArrayDocument,
  QueryBoardDocument,
} from '../../../../libs/interfaces/query/query.board.interface';
import { BoardDocument } from '../../schemas/board.schema';

export interface GetBoardService {
  getAllBoards(userId: string): QueryBoardArrayDocument;
  getBoardFromRepo(boardId: string): QueryBoardDocument;
  getBoard(
    boardId: string,
    userId: string,
  ): Promise<LeanDocument<BoardDocument> | null>;
}

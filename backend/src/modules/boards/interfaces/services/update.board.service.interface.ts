import { LeanDocument } from 'mongoose';
import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';
import BoardDto from '../../dto/board.dto';
import { BoardDocument } from '../../schemas/board.schema';

export interface UpdateBoardService {
  update(
    userId: string,
    boardId: string,
    boardData: BoardDto | LeanDocument<BoardDocument>,
  ): QueryBoardDocument;
}

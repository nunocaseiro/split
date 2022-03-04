import { LeanDocument } from 'mongoose';
import BoardDto from '../../dto/board.dto';
import { BoardDocument } from '../../schemas/board.schema';
import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';

export interface UpdateBoardApplication {
  update(
    userId: string,
    boardId: string,
    boardData: BoardDto | LeanDocument<BoardDocument>,
  ): QueryBoardDocument;
}

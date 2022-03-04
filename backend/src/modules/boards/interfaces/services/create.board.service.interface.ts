import { LeanDocument } from 'mongoose';
import BoardDto from '../../dto/board.dto';
import { BoardDocument } from '../../schemas/board.schema';

export interface CreateBoardService {
  create(
    boardData: BoardDto,
    userId: string,
  ): Promise<LeanDocument<BoardDocument> | null>;
}

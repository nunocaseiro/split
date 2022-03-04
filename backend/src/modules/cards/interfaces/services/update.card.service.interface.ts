import { LeanDocument } from 'mongoose';
import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';
import { BoardDocument } from '../../../boards/schemas/board.schema';

export interface UpdateCardService {
  updateCardPosition(
    boardId: string,
    cardId: string,
    targetColumnId: string,
    newPosition: number,
  ): Promise<LeanDocument<BoardDocument> | null>;
  updateCardText(
    boardId: string,
    cardId: string,
    cardItemId: string,
    userId: string,
    text: string,
  ): QueryBoardDocument;
  updateCardGroupText(
    boardId: string,
    cardId: string,
    userId: string,
    text: string,
  ): QueryBoardDocument;
}

import { QueryBoardDocument } from '../../../../libs/interfaces/query/query.board.interface';

export interface DeleteCardService {
  delete(boardId: string, cardId: string, userId: string): QueryBoardDocument;
}

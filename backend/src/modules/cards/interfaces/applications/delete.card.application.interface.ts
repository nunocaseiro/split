import { QueryBoardDocument } from 'src/libs/interfaces/query/query.board.interface';

export interface DeleteCardApplication {
  delete(boardId: string, cardId: string, userId: string): QueryBoardDocument;
}
